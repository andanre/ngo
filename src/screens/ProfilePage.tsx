
import { Link } from 'react-router-dom';
import { Container,  Breadcrumb } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { assets } from '../assets';

const ProfilePage = () => {

  

  return (
    <>
      <Header />
      <header className="pl-0">
        <div
          className="p-5 text-center bg-cover bg-center"
          style={{ backgroundImage: `url(${assets.hutan2})`, height: '80vh' }}
        >
          <div className=" bg-opacity-60 flex justify-center items-center h-full">
            <div className="text-white">
              <h1 className="text-center text-7xl font-bold  leading-normal  ">
                Profil NGO Tanggamus
              </h1>
              <h1 className="text-center text-7xl font-bold  leading-normal  ">
                ( Non Government Organizations )
              </h1>
            </div>
          </div>
        </div>
      </header>

      <Container className="my-5 mb-5">
        <Breadcrumb className='mb-5' style={{
          fontSize: '15px',
        }}>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/", style: { textDecoration: 'none', color: "#729762" } }}><b>Home</b></Breadcrumb.Item>
          <Breadcrumb.Item active>Profil</Breadcrumb.Item>
        </Breadcrumb>
        <div className="flex flex-col mx-auto max-w-screen-lg p-4 ">

          <h2 className="text-6xl font-semibold mt-4 mb-4 py-4">
            DLH Tanggamus
          </h2>

          <p className=" max-w-screen-lg mx-auto text-3xl leading-loose pb-5">
            Tanggamus, terletak di provinsi Lampung, Indonesia, adalah wilayah yang kaya akan biodiversitas.
            Daerah ini merupakan rumah bagi berbagai ekosistem, mulai dari hutan hujan tropis, pegunungan,
            hingga area pesisir yang indah. Keanekaragaman hayati ini mencakup berbagai spesies flora dan fauna,
            beberapa di antaranya adalah endemik, atau hanya dapat ditemukan di wilayah ini, seperti burung enggang dan harimau Sumatera.
          </p>

          <h2 className="text-6xl font-semibold mt-4 mb-4 py-4">
            NGO 2
          </h2>

          <p className=" max-w-screen-lg mx-auto text-3xl leading-loose pb-5">
            Tanggamus, terletak di provinsi Lampung, Indonesia, adalah wilayah yang kaya akan biodiversitas.
            Daerah ini merupakan rumah bagi berbagai ekosistem, mulai dari hutan hujan tropis, pegunungan,
            hingga area pesisir yang indah. Keanekaragaman hayati ini mencakup berbagai spesies flora dan fauna,
            beberapa di antaranya adalah endemik, atau hanya dapat ditemukan di wilayah ini, seperti burung enggang dan harimau Sumatera.
          </p>

          <h2 className="text-6xl font-semibold mt-4 mb-4 py-4">
            NGO 3
          </h2>

          <p className=" max-w-screen-lg mx-auto text-3xl leading-loose pb-5">
            Tanggamus, terletak di provinsi Lampung, Indonesia, adalah wilayah yang kaya akan biodiversitas.
            Daerah ini merupakan rumah bagi berbagai ekosistem, mulai dari hutan hujan tropis, pegunungan,
            hingga area pesisir yang indah. Keanekaragaman hayati ini mencakup berbagai spesies flora dan fauna,
            beberapa di antaranya adalah endemik, atau hanya dapat ditemukan di wilayah ini, seperti burung enggang dan harimau Sumatera.
          </p>

          <h2 className="text-6xl font-semibold mt-4 mb-4 py-4">
            NGO 4
          </h2>

          <p className=" max-w-screen-lg mx-auto text-3xl leading-loose pb-5">
            Tanggamus, terletak di provinsi Lampung, Indonesia, adalah wilayah yang kaya akan biodiversitas.
            Daerah ini merupakan rumah bagi berbagai ekosistem, mulai dari hutan hujan tropis, pegunungan,
            hingga area pesisir yang indah. Keanekaragaman hayati ini mencakup berbagai spesies flora dan fauna,
            beberapa di antaranya adalah endemik, atau hanya dapat ditemukan di wilayah ini, seperti burung enggang dan harimau Sumatera.
          </p>



        </div>




      </Container>

      <Footer />
    </>
  );
}

export default ProfilePage;
