// import { Article, ArticlesList, ArticleType, } from "../components/Article";
import {  useEffect } from "react";
import "./style.css";
import Header from "../components/Header";
import "./HalamanUtama.css"
import Footer from "../components/Footer";
import { assets } from "../assets";
import { Card, CardGroup, Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';
import Newshalamanutama from "../components/Newshalamanutama";





export const HalamanUtama = () => {


  const cards = [
    { title: "Hutan & Keanekaragaman Hayati", subtitle: "Kekuatan demi Kesehatan Planet", imageUrl: "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/ceiba-roots-600x400.jpeg.webp" },
    { title: "Iklim", subtitle: "Ketahanan dan solusi berbasis alam", imageUrl: "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/ceiba-roots-600x400.jpeg.webp" },
    { title: "Hak Asasi Manusia", subtitle: "Memajukan hak-hak masyarakat pedesaan", imageUrl: "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/ceiba-roots-600x400.jpeg.webp" }
  ];


  useEffect(() => {
    document.body.classList.add('halaman-utama');

    return () => {
      document.body.classList.remove('halaman-utama');
    };
  }, []);

  const variants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 }
  };



  return (
    <>
      <Header />

      <div>

        <div className="hero-container">

          <Carousel fade interval={500}>

            <Carousel.Item>
              <motion.div

                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  opacity: { duration: 0.2 }
                }}
                style={{ backgroundImage: `url(${assets.hutan2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                className="dark:bg-gray-900 text-white flex flex-col justify-center min-h-screen"
              >

                <section className="flex flex-col justify-center min-h-screen ">
                  <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 ml-5">

                    <div className="mr-auto place-self-center lg:col-span-7 ml-3"
                      style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.85)' }}> {/* Inline style for text shadow */}


                      <h1 className="max-w-5xl mb-4 text-4xl font-extrabold tracking-wider leading-tight md:text-6xl xl:text-7xl">
                        Ekosistem Perlindungan Alam Tanggamus
                      </h1>
                      <p className="max-w-2xl mb-6 font-light text-lg lg:mb-8 md:text-xl lg:text-2xl tracking-wider leading-relaxed">
                        Ecosystem Of Tanggamus Nature Protection
                      </p>

                      <a href="#" className="inline-flex items-center justify-center px-5 py-3 mr-10 text-lg font-medium text-center rounded-lg bg-green-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                        Info NGO
                        <svg className="w-6 h-6 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                      </a>
                      <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-lg font-medium text-center border border-gray-300 rounded-lg hover:bg-lime-900 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        Kontak Kami
                      </a>
                    </div>

                  </div>
                </section>
              </motion.div>
            </Carousel.Item>

            <Carousel.Item>
              <div
                style={{
                  backgroundImage: `url(${assets.hutan3})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                className="dark:bg-gray-900 text-white">
                <section className="flex flex-col justify-center min-h-screen ">
                  <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 ml-5">
                    <div className="mr-auto place-self-center lg:col-span-7 ml-3"
                      style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.85)' }}> {/* Inline style for text shadow */}
                      <h1 className="max-w-5xl mb-4 text-4xl font-extrabold tracking-wider leading-tight md:text-6xl xl:text-7xl">
                        Ekosistem Perlindungan Alam Tanggamus
                      </h1>
                      <p className="max-w-2xl mb-6 font-light text-lg lg:mb-8 md:text-xl lg:text-2xl tracking-wider leading-relaxed">
                        Ecosystem Of Tanggamus Nature Protection
                      </p>

                      <a href="#" className="inline-flex items-center justify-center px-5 py-3 mr-10 text-lg font-medium text-center rounded-lg bg-green-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                        Info NGO
                        <svg className="w-6 h-6 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                      </a>
                      <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-lg font-medium text-center border border-gray-300 rounded-lg hover:bg-lime-900 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        Kontak Kami
                      </a>
                    </div>
                  </div>
                </section>
              </div>

            </Carousel.Item>

            <Carousel.Item>
              <div
                style={{
                  backgroundImage: `url(${assets.hutan5})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                className="dark:bg-gray-900 text-white justify-center items-center">
                <section className="flex flex-col justify-center min-h-screen ">
                  <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 ml-5">
                    <div className="mr-auto place-self-center lg:col-span-7 ml-3 "
                      style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.85)' }}> {/* Inline style for text shadow */}

                      <h1 className="max-w-5xl mb-4 text-4xl font-extrabold tracking-wider leading-tight md:text-6xl xl:text-7xl">
                        Ekosistem Perlindungan Alam Tanggamus
                      </h1>
                      <p className="max-w-2xl mb-6 font-light text-lg lg:mb-8 md:text-xl lg:text-2xl tracking-wider leading-relaxed">
                        Ecosystem Of Tanggamus Nature Protection
                      </p>

                      <a href="#" className="inline-flex items-center justify-center px-5 py-3 mr-10 text-lg font-medium text-center rounded-lg bg-green-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                        Info NGO
                        <svg className="w-6 h-6 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                      </a>
                      <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-lg font-medium text-center border border-gray-300 rounded-lg hover:bg-lime-900 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        Kontak Kami
                      </a>
                    </div>

                  </div>
                </section>
              </div>

            </Carousel.Item>


          </Carousel>
        </div>
      </div>

      <section className="mb-40">

        <div className="flex flex-col mx-auto max-w-screen-lg p-4 ">

          <h1 className="text-center text-7xl font-bold mt-8 mb- leading-normal pt-10 pb-9">
            Perlindungan Alam Tanggamus: Upaya Menjaga Warisan Alam Sumatera
          </h1>
          <h2 className="text-4xl font-semibold mt-4 mb-4 py-4">
            Kekayaan Biodiversitas Tanggamus
          </h2>

          <p className=" max-w-screen-lg mx-auto text-3xl leading-loose pb-5">
            Tanggamus, terletak di provinsi Lampung, Indonesia, adalah wilayah yang kaya akan biodiversitas.
            Daerah ini merupakan rumah bagi berbagai ekosistem, mulai dari hutan hujan tropis, pegunungan,
            hingga area pesisir yang indah. Keanekaragaman hayati ini mencakup berbagai spesies flora dan fauna,
            beberapa di antaranya adalah endemik, atau hanya dapat ditemukan di wilayah ini, seperti burung enggang dan harimau Sumatera.
          </p>
        </div>

        <CardGroup className="flex flex-wrap justify-center max-w-full mx-5 gap-5">
          {cards.map((card, index) => (
            <Card key={index} className="text-white w-full  md:w-1/4 flex flex-col m-2 bg-cover bg-center relative rounded" >
              <Card.Img className="items-center" variant="top" src={card.imageUrl} style={{ height: '100%', objectFit: 'cover' }} />
              <Card.ImgOverlay className="flex flex-col items-center justify-center p-4 bg-gradient-to-t from-black via-transparent to-transparent ">
                <Card.Title className="text-5xl text-center text-balance"><b>{card.title}</b></Card.Title>
                <Card.Text className="">{card.subtitle}</Card.Text>
              </Card.ImgOverlay>
            </Card>
          ))}
        </CardGroup>

      </section>

      <header className="pl-0">
        <div
          className="p-5 text-center bg-cover bg-center"
          style={{ backgroundImage: `url(${assets.hutan2})`, height: '110vh' }}
        >
          <div className=" bg-opacity-60 flex justify-center items-center h-full">
            <div className="text-white">
              <h1 className="text-center text-7xl font-bold mt-8 mb- leading-normal pt-10 pb-9">
                Upaya Perlindungan dan Konservasi
              </h1>
              <h4 className="max-w-screen-lg mx-auto text-3xl leading-loose mb-3 py-5 text-justify">Upaya konservasi dan perlindungan alam telah diwujudkan melalui pembentukan area konservasi seperti
                taman nasional yang melindungi habitat penting dan spesies yang terancam punah, dengan dukungan
                pemerintah dan komunitas lokal. Selain itu, program pendidikan untuk meningkatkan kesadaran masyarakat tentang
                pentingnya pelestarian alam dan dampak negatif dari kegiatan merusak lingkungan telah dilaksanakan, bersamaan dengan
                pengembangan ekowisata yang bertanggung jawab sebagai alternatif ekonomi berkelanjutan yang memberi manfaat kepada
                masyarakat lokal dan mendukung usaha pelestarian.</h4>
              <a className="btn btn-outline-light btn-lg p-3 px-5" href="#!" role="button">
                Kontak Kami
              </a>
            </div>
          </div>
        </div>
      </header>

      <Newshalamanutama />


      <Footer />

    </>
  );

};



