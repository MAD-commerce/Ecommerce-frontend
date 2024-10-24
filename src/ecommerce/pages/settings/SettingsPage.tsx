
import { Footer, NavBar } from '../../../components';
import { useForm } from '../../../hooks';
import './settings.css';

const updateFormField = {
  name: '',
  price: '',
  type: '',
  discount: '',
  description: '',
};

type updateFormField = {
  name: string;
  price: string;
  type: string;
  discount: string;
  description: string;
};

export const SettingsPage = () => {

  const {
    name,
    address,
    onInputChange,
    onResetForm,
    isFormValid,
    onSelectChange,
    onTextAreaChange,
  } = useForm(updateFormField);

  const updateProduct = async (e: React.FormEvent) => {

  }

  return (
    <>
      <div className='app'>
        <NavBar type='header' />

        <main className='settings__body'>
          <section className='section' id='settings'>
            <div className='settings_container container grid'>
              <h1 className='settings__title'>Ajustes</h1>
              <hr />
              <div className='settings__content'>
                <div className='settings__form'>
                  <form className='form grid' onSubmit={updateProduct}>
                    <div className='group-input'>
                      <input
                        type='text'
                        placeholder='Nombre'
                        className=''
                        name='name'
                        value={name}
                        autoComplete='off'
                        onChange={onInputChange}
                      />
                    </div>
                    <div className='group-input'>
                      <input
                        type='text'
                        placeholder='Dirección'
                        className=''
                        name='address'
                        value={address}
                        autoComplete='off'
                        onChange={onInputChange}
                      />
                    </div>

                    <input
                      className='submit-button'
                      type='submit'
                      value='Actualizar'
                    />
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div >
    </>
  )
}
