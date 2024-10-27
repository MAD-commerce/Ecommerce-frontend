import { Footer, NavBar } from '../../../components'
import qr from '../../../assets/pagos.png'
import './pay.css'
import { useState } from 'react'
import { useAuthStore, useForm } from '../../../hooks'

const addressFormFields = {
    departament: '',
    city: '',
    postalCode: '',
    addressField: '',
};
export const PayPage = () => {

    const { user } = useAuthStore();

    const {
        departament,
        city,
        postalCode,
        addressField,
        onInputChange,
    } = useForm(addressFormFields);

    const [resume, setResume] = useState(false)

    const handlePay = (file: File | undefined) => {
        if (file) {
            setResume(true)
            console.log(file);
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
