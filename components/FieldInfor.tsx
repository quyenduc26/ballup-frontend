  "use client";

  import Image from "next/image";
  import { useRouter } from "next/navigation";

  const BookingDetail = () => {
    const router = useRouter();

    // Dữ liệu ảnh sân bóng
    const images = [
      "/images/image 3.png",
      "/images/image 3.png",
      "/images/image 3.png",
      "/images/image 3.png",
    ];

    // Thông tin booking
    const bookingInfo = {
      name: "WIN WIN",
      address: "Mỹ Khê 3, Sơn Trà, Đà Nẵng",
      bookingTime: "20:00 12/12/2012",
      returnTime: "21:00 12/12/2012",
      type: "5-player",
      price: "200,000 vnd",
      hours: 1,
      total: "200,000 vnd",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8359055478786!2d108.24943131537958!3d16.074737088881037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142183700a5bcbd%3A0x3d6d0b1a669e41!2zTcO5IEtow6ogMywgU8ahbiBUcsOgLCDEkMOgIE7huqFuZw!5e0!3m2!1sen!2s!4v1625159583132!5m2!1sen!2s",
    };

    return (
      <div className="max-w-5xl mx-auto p-4 mt-2020">
        {/* Nút BACK */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-black font-semibold mb-4"
        >
          <span className="text-2xl mr-2">←</span> BACK
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Bên trái - Hiển thị ảnh */}
          <div className="flex-1">
            <Image
              src={images[0]}
              alt="Main field"  
              width={600}
              height={400}
              className="rounded-lg w-full h-auto object-cover"
            />
            <div className="flex gap-2 mt-2">
              {images.slice(1).map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={`Field ${index + 2}`}
                  width={150}
                  height={100}
                  className="rounded-lg object-cover cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* Bên phải - Form đặt sân */}
          <div className="flex-1 border p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold">{bookingInfo.name}</h2>
            <p className="text-gray-500">{bookingInfo.address}</p>

            {/* Google Map */}
            <div className="mt-2">
              <iframe
                src={bookingInfo.mapUrl}
                width="100%"
                height="200"
                className="rounded-lg border"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <p className="font-semibold">From</p>
                <p>{bookingInfo.bookingTime}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">To</p>
                <p>{bookingInfo.returnTime}</p>
              </div>
            </div>

            <div className="mt-4 border-t pt-2">
              <div className="flex justify-between">
                <p className="font-semibold">Type</p>
                <p>{bookingInfo.type}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Price</p>
                <p>{bookingInfo.price}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Hour(s)</p>
                <p>{bookingInfo.hours}</p>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t pt-2">
                <p>Total</p>
                <p>{bookingInfo.total}</p>
              </div>
            </div>

            <button className="w-full bg-black text-white py-2 mt-4 rounded-lg">
              DEPOSIT
            </button>   
          </div>
        </div>
      </div>
    );        
  };

  export default BookingDetail;