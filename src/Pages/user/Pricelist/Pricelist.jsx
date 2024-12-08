import useFetchData from "../../../hook/useFeatchData";
import Carousel from "./carouselPL";
import { Link } from 'react-router-dom';
import "./PriceList.css";

// const vehicles = {
//   mpv: [
//     {
//       name: "Toyota Avanza",
//       rating: 4.6,
//       passengers: 7,
//       transmission: "Ganda",
//       airConditioner: true,
//       doors: 4,
//       price: 400000,
//       imageUrl: "/assets/images/img//toyota-avanza, Property 2=black.png",
//     },
//     {
//       name: "Mitsubisi Xpander",
//       rating: 4.7,
//       passengers: 7,
//       transmission: "Ganda",
//       airConditioner: true,
//       doors: 4,
//       price: 450000,
//       imageUrl: "/assets/images/img//misubisi-expander, Property 2=gray.png",
//     },
//     {
//       name: "Suzuki Ertiga",
//       rating: 4.6,
//       passengers: 7,
//       transmission: "Ganda",
//       airConditioner: true,
//       doors: 4,
//       price: 400000,
//       imageUrl: "/assets/images/img//suzuki-ertiga, Property 2=04.png",
//     },
//     {
//       name: "Daihatsu Xenia",
//       rating: 4.6,
//       passengers: 7,
//       transmission: "Ganda",
//       airConditioner: true,
//       doors: 4,
//       price: 400000,
//       imageUrl: "/assets/images/img//daihatsu-sirion, Property 2=01.png",
//     },
//   ],
//   cityCar: [
//     {
//       name: "Honda CRV",
//       rating: 4.5,
//       passengers: 5,
//       transmission: "Auto",
//       airConditioner: true,
//       doors: 4,
//       price: 400000,
//       imageUrl: "/assets/images/img//honda-crv, Property 2=02.png",
//     },
//     {
//       name: "Suzuki Ignis",
//       rating: 4.7,
//       passengers: 5,
//       transmission: "Auto",
//       airConditioner: true,
//       doors: 4,
//       price: 350000,
//       imageUrl: "/assets/images/img//suzuki-ignis, 01.png",
//     },
//     {
//       name: "Daihatsu Sirion",
//       rating: 4.8,
//       passengers: 5,
//       transmission: "Auto",
//       airConditioner: true,
//       doors: 4,
//       price: 350000,
//       imageUrl: "/assets/images/img//daihatsu-sirion, Property 2=01.png",
//     },
//     {
//       name: "Honda Brio",
//       rating: 4.7,
//       passengers: 5,
//       transmission: "Auto",
//       airConditioner: true,
//       doors: 4,
//       price: 350000,
//       imageUrl: "/assets/images/img//honda-brio, Property 2=04.png",
//     },
//   ],
//   luxuryCar: [
//     {
//       name: "Lexus LM",
//       rating: 4.7,
//       passengers: 4,
//       transmission: "Auto",
//       airConditioner: true,
//       doors: 4,
//       price: 1000000,
//       imageUrl: "/assets/images/img//lexus lm, Property 2=gray.png",
//     },
//     {
//       name: "Toyota Alpard",
//       rating: 4.8,
//       passengers: 7,
//       transmission: "Auto",
//       airConditioner: true,
//       doors: 4,
//       price: 1000000,
//       imageUrl: "/assets/images/img//toyota-alpard, Property 2=01.png",
//     },
//     {
//       name: "Mercedes Benz",
//       rating: 4.9,
//       passengers: 4,
//       transmission: "Auto",
//       airConditioner: true,
//       doors: 4,
//       price: 1000000,
//       imageUrl: "/assets/images/img//Mercedes-Benz S-Class.png",
//     },
//     {
//       name: "BMW 7 Series",
//       rating: 4.8,
//       passengers: 4,
//       transmission: "Auto",
//       airConditioner: true,
//       doors: 4,
//       price: 1000000,
//       imageUrl: "/assets/images/img//bmw i7, Property 2=black.png",
//     },
//   ],
//   twoWheelers: [
//     {
//       name: "Honda Vario 150",
//       rating: 4.7,
//       passengers: 2,
//       transmission: "Auto",
//       fuelEfficiency: "±45-48 km/liter",
//       engine: "150cc",
//       price: 150000,
//       imageUrl: "/assets/images/img//vario-150, Property 2=01.png",
//     },
//     {
//       name: "Yamaha NMAX 155",
//       rating: 4.8,
//       passengers: 2,
//       transmission: "Auto",
//       fuelEfficiency: "±40-43 km/liter",
//       engine: "155cc",
//       price: 180000,
//       imageUrl: "/assets/images/img//yamaha-nmax-155, Property 2=01.png",
//     },
//     {
//       name: "Vespa GTS 300",
//       rating: 4.9,
//       passengers: 2,
//       transmission: "Auto",
//       fuelEfficiency: "±25-30 km/liter",
//       engine: "300cc",
//       price: 210000,
//       imageUrl: "/assets/images/img//vespa-gts-300, Property 2=02.png",
//     },
//     {
//       name: "U.E-Motor MX1200",
//       rating: 4.9,
//       passengers: 2,
//       transmission: "Auto",
//       fuelEfficiency: "±50-60 km/full",
//       engine: "1200w",
//       price: 180000,
//       imageUrl: "/assets/images/img//united-e-motor-mx1200, Property 2=gray.png",
//     },
//   ],
// };

const VehicleCard = ({ id, name, rating, passenger_capacity, transmission_type, air_conditioner, doors, price, image }) => {
  return (
    <div className="card">
      <img src={`${import.meta.env.VITE_BACKEND_URL}/${image}`} alt={name} />
      <h3>{name}</h3>
      <p className="rating">
        ⭐ {rating} ({Math.floor(Math.random() * 1000)})
      </p>
      <ul className="features">
        <li>
          <i className="fas fa-user"></i> {passenger_capacity} Penumpang
        </li>
        <li>
          <i className="fas fa-cogs"></i> {transmission_type}
        </li>
      </ul>
      <ul className="features">
        {air_conditioner && (
          <li>
            <i className="fas fa-snowflake"></i> Air Conditioner
          </li>
        )}
        <li>
          <i className="fas fa-door-open"></i> {doors > 1 ? doors : "" } Pintu
        </li>
      </ul>
      <p className="price">
        <span className="price-label">Harga</span>
        <span className="price-value">
          <strong>Rp {price.toLocaleString()}</strong>
          <span className="price-duration">/hari</span>
        </span>
      </p>
      <Link to={`/sewa?vehicleId=${id}`}>
        <button className="rent-button">
          Sewa
        </button>
      </Link>
    </div>
  );
};

const VehicleSection = ({ title, description, vehicles }) => {
  return (
    <div className="vehicle-section">
      <div className="vehicle-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="vehicle-cards">
        {vehicles.map((vehicle, index) => (
          <VehicleCard key={index} {...vehicle} />
        ))}
      </div>
    </div>
  );
};

const images = [
  "./public/assets/images/img/slider mobil - honda crv.png",
  "./public/assets/images/img/slider mobil - toyota avanza.png",
  "./public/assets/images/img/slider mobil - toyota fortuner.png",
  "./public/assets/images/img/slider mobil - toyota alpard.png",
];

const CarRental = () => {
  const { data, loading, error } = useFetchData(`/vehicles`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const vehiclesData = data.data.vehicles;

  const vehicles_dump = {
    mpv: vehiclesData.filter((vehicle) => vehicle.type === "mpv"),
    cityCar: vehiclesData.filter((vehicle) => vehicle.type === "cityCar"),
    luxuryCar: vehiclesData.filter((vehicle) => vehicle.type === "luxuryCar"),
    twoWheelers: vehiclesData.filter((vehicle) => vehicle.type === "twoWheelers"),
  };

  console.log(vehicles_dump);

  return (
    <div className="isi-wrapper">
      <div className="carousel-contenttt">
        <Carousel images={images} />
      </div>

      <div className="isi">
        <VehicleSection
          title="Multi-Purpose Vehicle"
          description="Ideal untuk keluarga atau grup karena ruangnya yang luas dan mampu menampung hingga 7 penumpang. MPV adalah pilihan tepat untuk perjalanan jauh dengan banyak barang bawaan."
          vehicles={vehicles_dump.mpv}
        />
        <VehicleSection
          title="City Car"
          description="Cocok untuk berkendara dalam kota karena ukurannya yang kecil dan irit bahan bakar. Mobil ini pas untuk perjalanan singkat atau jalan-jalan santai di perkotaan."
          vehicles={vehicles_dump.cityCar}
        />
        <VehicleSection
          title="Luxury Car"
          description="Mobil premium yang menawarkan kenyamanan dan kemewahan ekstra, ideal untuk acara spesial atau perjalanan bisnis."
          vehicles={vehicles_dump.luxuryCar}
        />
        <VehicleSection
          title="Two-Wheelers"
          description="Kendaraan dua roda yang ekonomis dan praktis untuk penggunaan sehari-hari. Cocok untuk perjalanan singkat atau mobilitas harian yang hemat bahan bakar. Termasuk motor bebek, skuter premium, dan motor listrik."
          vehicles={vehicles_dump.twoWheelers}
        />
      </div>
      <div className="waves">
        <img src="/assets/images/img//waves.png" alt="Waves" />
      </div>
    </div>
  );
};

export default CarRental;
