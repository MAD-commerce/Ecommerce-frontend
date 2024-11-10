import { Footer, NavBar } from '../../../components'
import qr from '../../../assets/pagos.png'
import './pay.css'
import { SetStateAction, useEffect, useState } from 'react'
import { useAuthStore, useForm, useProductsStore } from '../../../hooks'

const addressFormFields = {
    departament: '',
    city: '',
    postalCode: '',
    addressField: '',
};
export const PayPage = () => {

    const { user } = useAuthStore();
    const { cart, products, sendEmail } = useProductsStore();
    const [productsList, setProductsList] = useState<ProductInterface[]>([])

    const {
        departament,
        city,
        postalCode,
        addressField,
        onInputChange,
    } = useForm(addressFormFields);

    const [resume, setResume] = useState(false)
    const [sumatory, setSumatory] = useState(0)

    useEffect(() => {
        filtrarProductos();
        calculateSumatory();
        listProducts();
    }, [])

    const listProducts = () => {
        let productsList: SetStateAction<ProductInterface[]> = []
        JSON.parse(JSON.stringify(filtrarProductos())).map(
            (product: ProductInterface) => (
                productsList.push(product)
            )
        )
        setProductsList(productsList)
    }

    const calculateSumatory = (): void => {
        let sum = 0;
        JSON.parse(JSON.stringify(filtrarProductos())).map((product: ProductInterface) => {
            sum += parseInt(calculateDiscount(product.price, product.discount));
        });
        setSumatory(sum);
    }

    const filtrarProductos = () => {
        if (Array.isArray(cart)) {
            const idsEnAmbasListas = products.filter((product: ProductInterface) =>
                cart.some((cart: Cart) => cart._id === product._id)
            );

            return idsEnAmbasListas;
        }

        return [];
    };

    const calculateDiscount = (price = '', discount = ''): string => {
        if (price && discount === '') return 'error';

        return (
            parseInt(price) -
            parseInt(price) * (parseInt(discount) / 100)
        ).toFixed(2);
    };

    const handlePay = (file: File | undefined) => {
        if (file) {
            setResume(true)
            let base64Image: string | ArrayBuffer | null

            const reader = new FileReader();
            reader.onloadend = () => {
                base64Image = reader.result;
                let modelAPi: Order = {
                    email: user?.email,
                    adress: user?.address!,
                    evidence: reader.result,
                    products: productsList.map((product) => ({
                        id: product._id!,
                        name: product.name!,
                        cantidad: 1
                    })),
                    totalPrice: sumatory
                }

                sendEmail(modelAPi)
            };
            reader.readAsDataURL(file);

        } else {
            return
        }
    }

    const items = user?.address?.split(';')

    return (
        <>
            <div className='app'>
                <NavBar type='header' />

                <main className='pay__body'>
                    <section className='section' id='pay'>
                        <div className='pay_container container grid'>
                            <h1 className='pay__title'>Finalizar compra</h1>
                            <hr className='pay__title' />
                            <div>
                                <p className="pay__title">Dirección de envío:</p>

                                <div className="pay_direccion-flex">
                                    <div className='group-input'>
                                        <p>Departamento</p>
                                        <input
                                            type='text'
                                            placeholder='Departamento'
                                            className='input'
                                            name='departament'
                                            value={items![0]}
                                            onChange={onInputChange}
                                        />
                                    </div>
                                    <div className='group-input'>
                                        <p>Ciudad</p>
                                        <input
                                            type='text'
                                            placeholder='Departamento'
                                            className='input'
                                            name='departament'
                                            value={items![1]}
                                            onChange={onInputChange}
                                        />
                                    </div>
                                    <div className='group-input'>
                                        <p>Código postal</p>
                                        <input
                                            type='text'
                                            placeholder='Departamento'
                                            className='input'
                                            name='departament'
                                            value={items![2]}
                                            onChange={onInputChange}
                                        />
                                    </div>

                                </div>
                                <div className='group-input'>
                                    <p>Dirección</p>
                                    <input
                                        type='text'
                                        placeholder='Departamento'
                                        className='input'
                                        name='departament'
                                        value={items![3]}
                                        onChange={onInputChange}
                                    />
                                </div>

                            </div>
                            <hr className='pay__title' />
                            <div className="pay_qr">
                                <p className='pay__title'>Escanea y paga</p>
                                <img src={qr} alt="" />
                                <button
                                    className="submit-button"
                                    onClick={() => document.getElementById("file-input")?.click()}>
                                    Subir evidencia
                                </button>
                                <input
                                    type="file"
                                    id="file-input"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={(e) => handlePay(e.target.files?.[0])}
                                />
                            </div>
                            <hr className='pay__title' />
                            <div className="pay_resume">
                                {
                                    resume ? (
                                        <>
                                            <div className="pay_resume-item">
                                                <div className="pay_resume-title">
                                                    Estamos procesando tu pago...
                                                </div>
                                                <div className="">
                                                    <b className='pay__title'>{user?.name}</b> tu compra está siendo procesada. Recibirás un email a {user?.email} en las próximas 24 horas a tu correo con los detalles de tu pedido y un enlace para rastrear tu pedido.
                                                    ¡Gracias por tu confianza!
                                                </div>
                                            </div>
                                        </>
                                    ) : null
                                }
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </>
    )
}
