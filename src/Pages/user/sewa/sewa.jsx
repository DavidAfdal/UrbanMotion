import useFetchData from "../../../hook/useFeatchData";
import { useLocation } from 'react-router-dom';
import "./sewa.style.css";
import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../../utils/axios";
import { getToken } from "../../../utils/authUtils";
import { formatRupiah } from "../../../utils/foramtCurrency";

const steps = ["Detail Sewa", "Pilih Metode Pembayaran", "Konfirmasi Pemesanan"];

export default function Sewa() {
  const location = useLocation();
  const { data, loading, error } = useFetchData(`/vehicles`);
  const tokenUser = getToken(); 
  const [bookingData, setBookingData] = useState({
    vehicleId: '',
    vehicleName: '',
    username: '',
    email: '',
    phoneNumber: '',
    address: '',
    driver: '',
    rentalDate: '',
    paymentMethod: '',
    totalDays: 0,
    price: 0,
  });


  const validateForm = () => {
    const newErrors = {};
    if (!bookingData.username) newErrors.username = "Nama pengguna wajib diisi";
    if (!bookingData.email) newErrors.email = "Email wajib diisi";
    if (!bookingData.phoneNumber) newErrors.phoneNumber = "Nomor handphone wajib diisi";
    if (!bookingData.vehicleId) newErrors.vehicleId = "Kendaraan wajib diisi";
    if (!bookingData.paymentMethod) newErrors.paymentMethod = "Anda harus memilih metode pembayaran";
    if (!bookingData.address) newErrors.address = "Alamat wajib diisi";
    if (!bookingData.rentalDate) newErrors.rentalDate = "Tanggal sewa wajib diisi";
    if (!bookingData.driver) newErrors.driver = "Driver wajib diisi";
    if (bookingData.totalDays === 0) newErrors.totalDays = "Jumlah hari wajib diisi";

    return newErrors;
  };

  // Use useMemo to memoize vehiclesData and avoid unnecessary re-calculations
  const vehiclesData = useMemo(() => data?.data?.vehicles || [], [data]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const vehicleId = queryParams.get('vehicleId');
    
    // Set selectedVehicleId to query param or empty string if not found


    if (vehicleId !== null) {
      // Convert vehicleId to number if vehicle.id is a number
      const vehicleSelected = vehiclesData.find((vehicle) => vehicle.id === parseInt(vehicleId));

      // If a matching vehicle is found, update bookingData
      if (vehicleSelected) {
        setBookingData((prevData) => ({
          ...prevData,
          vehicleId: vehicleSelected.id,
          vehicleName: vehicleSelected.name,
          price: vehicleSelected.price,
        }));
      }
    }
  }, [location.search, vehiclesData]); // Only re-run when location.search or vehiclesData change

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "vehicleId") {

      const vehicleSelected = vehiclesData.find((vehicle) => vehicle.id === parseInt(value));

      if (vehicleSelected) {
        setBookingData((prevData) => ({
          ...prevData,
          vehicleId: vehicleSelected.id,
          vehicleName: vehicleSelected.name,
          price: vehicleSelected.price,
        }));
      }
    } else if (name === 'payment-method') {
      setBookingData((prevData) => ({
        ...prevData,
        paymentMethod: value, // For all other inputs, use the name and value to update the state
      }));
    } else {
      setBookingData((prevData) => ({
        ...prevData,
        [name]: value, // For all other inputs, use the name and value to update the state
      }));
    }

  };


  const handleBooking = async () => {
      if (!tokenUser) {
            console.log(tokenUser)
            alert("Anda harus login terlebih dahulu");
            return 
      }
    
      const errors = validateForm(); 
      if (Object.keys(errors).length > 0) {
        alert("Harap isi semua data dengan benar");
        return;
      }

     try {


        const bookingRequestData = {
          vehicleID: bookingData.vehicleId,
          username: bookingData.username,
          email: bookingData.email,
          phone_number: bookingData.phoneNumber,
          address: bookingData.address,
          driver: bookingData.driver,
          rental_date: bookingData.rentalDate,
          payment_method: bookingData.paymentMethod === "dana" ? "other_qris" : bookingData.paymentMethod,
          total_days: bookingData.totalDays,
          price: totalAmount(bookingData.price, bookingData.totalDays, bookingData.driver),
        }


        console.log(bookingRequestData);
        
        const response = await axiosInstance.post(`/booking`, bookingRequestData, 
            {
              headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenUser}`,
          }
        });

        window.location.href = response.data.data.chargeResponse.redirect_url;
     } catch (error) {
       console.log(error);
     }
  };

  const totalAmount = (price, totalDays, driver) => {
    const totalPrice = price * totalDays;
    const driverPrice = driver !== "tanpa driver" ? 200000 : 0;
    return totalPrice + driverPrice;
  }
  
  return (
    <div>
      <div className="container-sewa ">
        {/* form section */}
        <div className="section-wrapper-sewa">
          {/* steps */}
          <div className="step-container">
            {steps.map((step, index) => {
              return <PriceStep key={index} step={index + 1} title={step} />;
            })}
          </div>

          <div className="hor-line">
            <hr />
          </div>
       
          <div className="detail-sewa-form  ">
            <form className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Form Pemesanan</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label htmlFor="namalengkap" className="block text-sm font-medium mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    placeholder="nama lengkap"
                    name="username" 
                    className="form-input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="namalengkap"
                    value={bookingData.username}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-1">
                  <label htmlFor="pilih-kendaraan" className="block text-sm font-medium mb-2">
                    Pilih Kendaraan
                  </label>
                  <select
                    className="form-select w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="pilih-kendaraan"
                    name="vehicleId"
                    onChange={handleChange}
                    value={bookingData.vehicleId}
                    >
                    <option value="" disabled>
                      pilih kendaraan
                    </option>
                    {vehiclesData.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.name}
                      </option>
                    ))}
                 
                  </select>
                </div>

                <div className="col-span-1">
                  <label htmlFor="alamat" className="block text-sm font-medium mb-2">
                    Alamat
                  </label>
                  <input
                    type="text"
                    placeholder="alamat"
                    name="address"
                    value={bookingData.address}
                    onChange={handleChange}
                    className="form-input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="alamat"
                  />
                </div>

                <div className="col-span-1">
                  <label htmlFor="jumlah-hari" className="block text-sm font-medium mb-2">
                    Jumlah Hari
                  </label>
                  <select
                    className="form-select w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="totalDays"
                    onChange={handleChange}
                    value={bookingData.totalDays}
                    id="jumlah-hari">
                    <option disabled value="0">
                      jumlah hari
                    </option>
                    <option value="1">1 Hari</option>
                    <option value="2">2 Hari</option>
                    <option value="3">3 Hari</option>
                    <option value="4">4 Hari</option>
                    <option value="5">5 Hari</option>
                    <option value="6">6 Hari</option>
                    <option value="7">7 Hari</option>
                  </select>
                </div>

                <div className="col-span-1">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    value={bookingData.email}
                    onChange={handleChange}
                    className="form-input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="email"
                  />
                </div>

                <div className="col-span-1">
                  <label htmlFor="pilih-driver" className="block text-sm font-medium mb-2">
                    Pilih Driver
                  </label>
                  <select
                    className="form-select w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="driver"
                    value={bookingData.driver}
                    onChange={handleChange}
                    id="pilih-driver">
                    <option disabled value="">
                      pilih driver
                    </option>
                    <option value="tanpa driver">Tanpa Driver</option>
                    <option value="laki-laki">Laki - Laki</option>
                    <option value="perempuan">Perempuan</option>
                  </select>
                </div>

                <div className="col-span-1">
                  <label htmlFor="notelepon" className="block text-sm font-medium mb-2">
                    No Telepon
                  </label>
                  <input
                    type="text"
                    placeholder="no telepon"
                    name="phoneNumber"
                    value={bookingData.phoneNumber}
                    onChange={handleChange}
                    className="form-input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="notelepon"
                  />
                </div>

                <div className="col-span-1">
                  <label htmlFor="tanggal" className="block text-sm font-medium mb-2">
                    Tanggal Sewa
                  </label>
                  <input
                    type="date"
                    className="form-input  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="tanggal"
                    name="rentalDate"
                    value={bookingData.rentalDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
          </div>
          </div>

        <div className="payment-method-wrapper">
            <div className="section-wrapper col-8">
              <h2>Pilih Metode Pembayaran</h2>
              <div className="payment-category">
                <div className="payment-method-subtitle">QRIS</div>
                <div className="payment-method-list">
                  <div className="col-6">
                    <PaymentMethodItem
                      imgUrl={
                        "https://seeklogo.com/images/Q/quick-response-code-indonesia-standard-qris-logo-F300D5EB32-seeklogo.com.png"
                      }
                      title={"QRIS"}
                      value={"other_qris"}
                      onChange={handleChange}
                      groupName="payment-method"
                    />
                  </div>
                </div>
              </div>
              <div className="payment-category">
                <div className="payment-method-subtitle">Transfer Bank</div>
                <div className="payment-method-list">
                  <div className="col-6">
                    <PaymentMethodItem
                      imgUrl={"/assets/images/img/mandiri.png"}
                      title={"Mandiri"}
                      value={"echannel"}
                      onChange={handleChange}
                      groupName="payment-method"
                    />
                    <PaymentMethodItem
                      imgUrl={"/assets/images/img/bank bri.png"}
                      title={"BRI"}
                      value={"bri_va"}
                      onChange={handleChange}
                      groupName="payment-method"
                    />
                    <PaymentMethodItem 
                      imgUrl={"/assets/images/img/bni.png"} 
                      title={"BNI"} 
                      groupName="payment-method" 
                      onChange={handleChange} 
                      value={"bni_va"} 
                    />
                  </div>
                  <div className="col-6">
                    <PaymentMethodItem
                      imgUrl={"https://storage.googleapis.com/go-merchant-production.appspot.com/uploads/2024/10/b8ed83a966c951414a2c0ababa0b6987_377d64303a92b5d124043e753ae85f64_compressed.png"}
                      title={"Permata Bank"}
                      value={"permata_va"}
                      onChange={handleChange}
                      groupName="payment-method"
                    />
                    <PaymentMethodItem 
                        imgUrl={"/assets/images/img/bca.png"} 
                        title={"BCA"} 
                        groupName="payment-method" 
                        onChange={handleChange}
                        value={"bca_va"}
                      />
                    <PaymentMethodItem
                      imgUrl={"https://storage.googleapis.com/go-merchant-production.appspot.com/uploads/2023/08/edd9f22258760cc127712d1292f8a10a_e4b59ee9f4466d7d808dc89f031da7a6_compressed.png"}
                      title={"CIMB Niaga"}
                      value={"cimb_va"}
                      onChange={handleChange}
                      groupName="payment-method"
                    />
                  </div>
                </div>
              </div>

              <div className="payment-category ">
                <div className="payment-method-subtitle">E-Wallet</div>
                <div className="payment-method-list">
                  <div className="col-6">
                    <PaymentMethodItem
                      imgUrl={"/assets/images/img/gopay.png"}
                      title={"Gopay"}
                      value={"gopay"}
                      onChange={handleChange}
                      groupName="payment-method"
                    />
                    <PaymentMethodItem 
                      imgUrl={"https://storage.googleapis.com/go-merchant-production.appspot.com/uploads/2020/10/f7fb2e0ab8572355142dba33ddc7b8d6_0747205be87147c03d04217ad4eb06c3_compressed.png"} 
                      title={"Shopee Pay"} 
                      groupName="payment-method"
                      onChange={handleChange}
                      value={"shopeepay"}/>
                    <PaymentMethodItem
                      imgUrl={"https://media.licdn.com/dms/image/v2/D560BAQECqUQSToxRoQ/company-logo_200_200/company-logo_200_200/0/1700729590328/akulaku_logo?e=2147483647&v=beta&t=PpvLrRhY2ZH3w3B8GRqyU2FS5eZak27IwYaUS--oCP4"}
                      title={"Akulaku"}
                      value={"akulaku"}
                      onChange={handleChange}
                      groupName="payment-method"
                    />
                  </div>
                  <div className="col-6">
                    <PaymentMethodItem
                      imgUrl={"/assets/images/img/dana.png"}
                      title={"Dana"}
                      value={"dana"}
                      onChange={handleChange}
                      groupName="payment-method"
                    />
                    <PaymentMethodItem
                      imgUrl={"/assets/images/img/kredivo.png"}
                      title={"Kredivo"}
                      value={"kredivo"}
                      onChange={handleChange}
                      groupName="payment-method"
                    />
                  </div>
                </div>
              </div>

              <div className="payment-category">
                <div className="payment-method-subtitle">Credit Card</div>
                <div className="payment-method-list">
                  <div className="col-6">
                    <PaymentMethodItem
                      imgUrl={"/assets/images/img/mastercard-icon.png"}
                      title={"Mastercard"}
                      groupName="payment-method"
                      onChange={handleChange}
                      value={"credit_card"}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="section-wrapper col-4">
              <div className="details">
                <h2>Detail Sewa</h2>
                <p className="detail-label">Nama Lengkap</p>
                <p>
                  <strong>{bookingData.username ? bookingData.username : "-" }</strong>
                </p>
                <p className="detail-label">Alamat</p>
                <p>
                  <strong>{bookingData.address ? bookingData.address : "-" }</strong>
                </p>
                <p className="detail-label">Email</p>
                <p>
                  <strong>{bookingData.email ? bookingData.email : "-" }</strong>
                </p>
                <p className="detail-label">No Tlp</p>
                <p>
                  <strong>{bookingData.phoneNumber ? bookingData.phoneNumber : "-" }</strong>
                </p>
                <hr />
                <p className="detail-label">Nama Kendaraan</p>
                <p>
                  <strong>{bookingData.vehicleName ? bookingData.vehicleName : "-" }</strong>
                </p>
                <p className="detail-label">Jumlah Hari</p>
                <p>
                  <strong>{bookingData.totalDays ? `${bookingData.totalDays} Hari` : "-" }</strong>
                </p>
                <p className="price-line">
                  Harga / hari
                  <strong className="price">{bookingData.price && bookingData.totalDays ? `${formatRupiah(bookingData.price * bookingData.totalDays)}` : "-" }</strong>
                </p>
                <p className="detail-label">Driver</p>
                <p className="price-line">
                  <strong>{bookingData.driver ? bookingData.driver : "-" }</strong>
                  <strong className="price">{bookingData.driver && bookingData.driver !== "tanpa driver" ? ` ${formatRupiah(200000)}` : "-" }</strong>
                </p>
                <hr />
                <p className="total">
                  Total
                  <strong className="price">{bookingData.price && bookingData.totalDays ? ` ${formatRupiah(totalAmount(bookingData.price,bookingData.totalDays,bookingData.driver))}` : "-" }</strong>
                </p>
                <div className="confirm-button">
                  <button onClick={() => handleBooking()}>Konfirmasi Pemesanan</button>
                </div>
              </div>
            </div>
  
        </div>
      </div>
    </div>
  );
}

function PriceStep({ step, title }) {

  return (
    <>
      <div className="step">
        <div className="circle">{step}</div>
        <div className="step-text">{title}</div>
      </div>
      {step < steps.length && <div className="separator">—</div>}
    </>
  );
}

function PaymentMethodItem({ imgUrl, title, groupName, value, onChange }) {
  return (
    <div className="payment-method-item">
      <img src={imgUrl} className="payment-method-item-logo" />
      <h5 className="payment-method-item-title">{title}</h5>
      <input type="radio" name={groupName} id="" value={value} onChange={onChange}  />
    </div>
  );
}
