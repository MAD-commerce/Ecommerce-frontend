
import { useEffect } from 'react';
import { Footer, NavBar } from '../../../components';
import { useAuthStore, useForm } from '../../../hooks';
import './settings.css';

const updateFormField = {
  name: '',
  address: '',
  email: '',
};

type updateFormField = {
  name: string;
  address: string;
  email: string;
};

export const SettingsPage = () => {

  const {
    name,
    email,
    address,
    onInputChange,
    onResetForm,
    isFormValid,
    onSelectChange,
    onTextAreaChange,
  } = useForm(updateFormField);

  const { user, updateUser } = useAuthStore();

  useEffect(() => {
    updateFormField.name = user?.name || '';
    updateFormField.address = user?.address || '';
    updateFormField.email = user?.email || '';
  }, [user]);

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call the API to update the product
      onResetForm();

      updateUser({
        name,
        address,
        email,
      });

    } catch (error) {
      console.error('Error updating the product', error);
    }
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
                  <form className='form grid' onSubmit={handleUpdateUser}>
                    <h1>Actualizar información</h1>
                    <div className='group-input'>
                      <p>Nombre</p>
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
                      <p>Dirección</p>
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
                    <div className='group-input'>
                      <p>Correo</p>
                      <input
                        type='text'
                        placeholder='email'
                        className=''
                        name='email'
                        value={email}
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
