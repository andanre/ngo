import React from 'react';

// Define a type for the articles
type Article = {
    title: string;
    date: string;
    summary: string;
    imageUrl: string;
}

const Newshalamanutama: React.FC = () => {
    const articles: Article[] = [
        {
            title: "MRT Jakarta dan YABI Rayakan Hari Badak Sedunia",
            date: "28 Sep at 3:02 pm",
            summary: "Dalam rangka Hari Badak Sedunia yang diperingati setiap 22 September, pada Jum'at, 27 September 2024 Yayasan Badak Indonesia (YABI) dan MRT Jakarta melangsungkan kegiatan ceremony kerja sama dan talkshow interaktif bertajuk “Harmoni Keanekaragaman Hayati Dalam Rangka Mendukung Pembangunan Berkelanjutan.” Kegiatan ini berlangsung di stasiun MRT Bundaran HI, Jakarta.",
            imageUrl: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        },
        {
            title: "BBTNBBS dan YABI Melaksanakan Rhino Goes To School (RGTS) ke Empat Sekolah di Kabupaten Lampung Barat.",
            date: "22 Sep at 3:20 pm",
            summary: "Sahabat Badak, dalam rangka peringatan Hari Badak Sedunia tahun 2024 yang diperingati setiap 22 September, Balai Besar Taman Nasional Bukit Barisan Selatan (BBTNBBS) bersama Yayasan Badak Indonesia (YABI)...",
            imageUrl: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        },
        {
            title: "BBTNBBS dan YABI Melaksanakan Rhino Goes To School (RGTS) ke Empat Sekolah di Kabupaten Lampung Barat.",
            date: "22 Sep at 3:20 pm",
            summary: "Sahabat Badak, dalam rangka peringatan Hari Badak Sedunia tahun 2024 yang diperingati setiap 22 September, Balai Besar Taman Nasional Bukit Barisan Selatan (BBTNBBS) bersama Yayasan Badak Indonesia (YABI)...",
            imageUrl: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        },
        {
            title: "BBTNBBS dan YABI Melaksanakan Rhino Goes To School (RGTS) ke Empat Sekolah di Kabupaten Lampung Barat.",
            date: "22 Sep at 3:20 pm",
            summary: "Sahabat Badak, dalam rangka peringatan Hari Badak Sedunia tahun 2024 yang diperingati setiap 22 September, Balai Besar Taman Nasional Bukit Barisan Selatan (BBTNBBS) bersama Yayasan Badak Indonesia (YABI)...",
            imageUrl: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        }

        // More articles can be added here
    ];

    return (

        <>
            <div className="pb-24">
                <div className="flex flex-col mx-auto max-w-screen-lg p-4 ">

                    <h1 className="text-center text-7xl font-bold mt-8 mb- leading-normal pt-10 pb-9">
                        News & Fact
                    </h1>
                </div>

                <div className="flex flex-col justify-center items-center my-4 gap-5">
                    {articles.map((article, index) => (
                        <div key={index} className=" flex md:w-3/4 max-w-full my-2 bg-white  rounded-lg overflow-hidden">
                            <img src={article.imageUrl} alt={article.title} className="w-min-full h-96  object-cover" />
                            <div className="max-w-5xl p-4">
                                <h5 className="  text-5xl  text-gray-900">{article.title}</h5>
                                <p className="text-sm text-gray-500">{article.date}</p>
                                <p className="text-xl mt-2 text-gray-700 leading-loose">{article.summary}</p>
                            </div>
                        </div>
                    ))}
                </div>


            </div>

        </>

    );
}

export default Newshalamanutama;
