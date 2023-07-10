import React, { useContext, useEffect } from "react";
import axios from "axios";
import "../UI/AdminPage.css";
// import { GenerateData } from "../services/GenerateData";

import { AppContext } from "../context/GlobalContext";
import CreateCountryForm from "../components/AdminComponents/CreateCountryForm";
import CreateCityForm from "../components/AdminComponents/CreateCityForm";

import CreateAddressForm from "../components/AdminComponents/CreateAddressForm";
import CreatePlaceForm from "../components/AdminComponents/CreatePlaceForm";
import CreateStageForm from "../components/AdminComponents/CreateStageForm";
import CreateCustomerForm from "../components/AdminComponents/CreateCustomerForm";

import CreateEventImageForm from "../components/AdminComponents/CreateEventImageForm";
import CreateRatingForm from "../components/AdminComponents/CreateRatingForm";
import CreateEventStageForm from "../components/AdminComponents/CreateEventStageForm";
import CreateTicketForm from "../components/AdminComponents/CreateTicketForm";
import CreateEventForm from "../components/AdminComponents/CreateEventForm";

import ListEventSeatsForm from "../components/AdminComponents/ListEventSeatsForm";
import ListSeatsForm from "../components/AdminComponents/ListSeatsForm";

function AdminPage() {
  const {
    isSearchClicked,
    isAdmin,
    setLoading,
    setAllCountries,
    setAllCities,
    setAllAddresses,
    setAllPlaces,
    setAllStages,
    setAllCustomers,
    setAllEvents,
    setAllEventImages,
    setAllRatings,
    setAllEventStages,
    setAllTickets,
    setAllEventSeats,
    setAllSeats,
    fetchEvent,
  } = useContext(AppContext);
  const fetchCountry = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://localhost:7169/api/country");
      setAllCountries(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createCountry = async (country) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/country", country);
      fetchCountry();
    } catch (error) {
      console.log(error);
      alert("Country could not created!");
    } finally {
      setLoading(false);
    }
  };

  const deleteCountry = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7169/api/country/${id}`);
      fetchCountry();
      alert("Country Deleted!");
    } catch (error) {
      console.log(error);
      alert("Country could not deleted!");
    } finally {
      setLoading(false);
    }
  };

  const fetchCity = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/city");
      setAllCities(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const createCity = async (city) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/city", city);
      fetchCity();
    } catch (error) {
      console.log(error);
      alert("City could not created!");
    } finally {
      setLoading(false);
    }
  };

  const deleteCity = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7169/api/city/${id}`);
      fetchCity();
    } catch (error) {
      console.log(error);
      alert("City could not deleted!");
    } finally {
      setLoading(false);
    }
  };
  const fetchAddress = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/address");
      setAllAddresses(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const createAddress = async (address) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/address", address);
      fetchAddress();
    } catch (error) {
      console.log(error);
      alert("Address could not created!");
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7169/api/address/${id}`);
      fetchAddress();
      alert("Address Deleted!");
    } catch (error) {
      console.log(error);
      alert("Address could not deleted!");
    } finally {
      setLoading(false);
    }
  };

  const fetchPlace = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/place");
      setAllPlaces(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createPlace = async (place) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/place", place);
      fetchPlace();
      fetchAddress();
    } catch (error) {
      console.log(error);
      alert("Place could not created!");
    } finally {
      setLoading(false);
    }
  };

  const deletePlace = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7169/api/place/${id}`);
      fetchPlace();
      alert("Place Deleted!");
    } catch (error) {
      console.log(error);
      alert("Place could not deleted!");
    } finally {
      setLoading(false);
    }
  };

  const fetchStage = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/stage");
      setAllStages(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const createStage = async (stage) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/stage", stage);
      fetchStage();
      fetchSeats();
    } catch (error) {
      console.log(error);
      alert("Stage could not created!");
    } finally {
      setLoading(false);
    }
  };
  const deleteStage = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7169/api/stage/${id}`);
      fetchStage();
      fetchSeats();
      fetchEventStage();
      fetchEventSeats();
      alert("Stage Deleted!");
    } catch (error) {
      console.log(error);
      alert("Stage could not deleted!");
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomer = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/customer");
      setAllCustomers(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createCustomer = async (customer) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/customer", customer);
      fetchCustomer();
      fetchAddress();
    } catch (error) {
      console.log(error);
      alert("Customer could not created!");
    } finally {
      setLoading(false);
    }
  };
  const deleteCustomer = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7169/api/customer/${id}`);
      fetchCustomer();
    } catch (error) {
      console.log(error);
      alert("Customer could not deleted!");
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (event) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/event", event);
      fetchEvent();
      fetchEventImage();
      fetchEventStage();
      fetchEventSeats();
    } catch (error) {
      console.log(error);
      alert("Event could not created!");
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    try {
      setLoading(true);
      axios.delete(`https://localhost:7169/api/event/${id}`);
      fetchEvent();
      fetchEventImage();
      fetchEventStage();
      fetchEventSeats();

      alert("Event Deleted!");
    } catch (error) {
      console.log(error);
      alert("Event could not deleted!");
    } finally {
      setLoading(false);
    }
  };
  const fetchEventImage = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/eventimage");
      setAllEventImages(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createEventImage = async (eventImage) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/eventimage", eventImage);
      fetchEventImage();
      fetchEvent();
    } catch (error) {
      console.log(error);
      alert("Event Image could not created!");
    } finally {
      setLoading(false);
    }
  };
  const deleteEventImage = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7169/api/eventimage/${id}`);
      fetchEventImage();
      fetchEvent();
      alert("Event Image Deleted!");
    } catch (error) {
      console.log(error);
      alert("Event Image could not deleted!");
    } finally {
      setLoading(false);
    }
  };

  const fetchRating = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/rating");
      setAllRatings(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const createRating = async (rating) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/rating", rating);
      fetchRating();
      fetchEvent();
    } catch (error) {
      console.log(error);
      alert("Rating could not created!");
    } finally {
      setLoading(false);
    }
  };

  const deleteRating = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7169/api/rating/${id}`);
      fetchRating();
    } catch (error) {
      console.log(error);
      alert("Rating could not deleted!");
    } finally {
      setLoading(false);
    }
  };

  const fetchEventStage = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/eventstage");
      setAllEventStages(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const createEventStage = async (eventStage) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/eventstage", eventStage);
      fetchEventStage();
      fetchEventSeats();
    } catch (error) {
      console.log(error);
      alert("Event Stage could not created!");
    } finally {
      setLoading(false);
    }
  };
  const deleteEventStage = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7169/api/eventstage/${id}`);
      fetchEventStage();
      fetchEventSeats();
      alert("Event Stage Deleted!");
    } catch (error) {
      console.log(error);
      alert("Event Stage could not deleted!");
    } finally {
      setLoading(false);
    }
  };

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/ticket");
      setAllTickets(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async (ticket) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/ticket", ticket);
      fetchTicket();
      fetchEventStage();
      fetchEventSeats();
    } catch (error) {
      console.log(error);
      alert("Ticket could not created!");
    } finally {
      setLoading(false);
    }
  };
  const deleteTicket = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7169/api/ticket/${id}`);
      fetchTicket();
      fetchEventStage();
      fetchEventSeats();
      alert("Ticket Deleted!");
    } catch (error) {
      console.log(error);
      alert("Ticket could not deleted!");
    } finally {
      setLoading(false);
    }
  };

  const fetchEventSeats = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/eventseat");
      setAllEventSeats(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEventSeat = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7169/api/eventseat/${id}`);
      fetchEventSeats();
      fetchEventStage();
      fetchEvent();
      fetchTicket();
      fetchRating();
      alert("Event Seat Deleted!");
    } catch (error) {
      console.log(error);
      alert("Event Seat could not deleted!");
    } finally {
      setLoading(false);
    }
  };

  const createEventSeat = async (eventSeat) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/eventseat", eventSeat);
      fetchEventSeats();
      fetchEventStage();
    } catch (error) {
      console.log(error);
      alert("Event Seat could not created!");
    } finally {
      setLoading(false);
    }
  };

  const fetchSeats = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/seat");
      setAllSeats(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createSeat = async (seat) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/seat", seat);
      fetchSeats();
      fetchStage();
    } catch (error) {
      console.log(error);
      alert("Seat could not created!");
    } finally {
      setLoading(false);
    }
  };

  const deleteSeat = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7169/api/seat/${id}`);
      fetchSeats();
      fetchStage();
      fetchEventStage();
      fetchEventSeats();

      alert("Seat Deleted!");
    } catch (error) {
      console.log(error);
      alert("Seat could not deleted!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCountry();
    fetchCity();
    fetchAddress();
    fetchPlace();
    fetchStage();
    fetchCustomer();
    fetchEventImage();
    fetchEvent();
    fetchRating();
    fetchEventStage();
    fetchTicket();
    fetchEventSeats();
    fetchSeats();
  }, []);

  const newcountries = [
    {
      name: "Turkiye",
    },
    {
      name: "Azerbeijan",
    },
    {
      name: "England",
    },
    {
      name: "Spain",
    },
    {
      name: "Germany",
    },
    {
      name: "Italy",
    },
  ];

  const newcities = [
    {
      name: "Istanbul",
      countryId: 1,
    },
    {
      name: "Ankara",
      countryId: 1,
    },
    {
      name: "Izmir",
      countryId: 1,
    },
    {
      name: "Baku",
      countryId: 2,
    },
    {
      name: "London",
      countryId: 3,
    },
    {
      name: "Madrid",
      countryId: 4,
    },
    {
      name: "Berlin",
      countryId: 5,
    },
    {
      name: "Rome",
      countryId: 6,
    },
  ];

  const newaddresses = [
    {
      name: "Mustafa's address",
      cityId: 1,
      fullAddress: "19 Mayis mh",
      latitude: "41.015137",
      longitude: "28.979530",
    },
    {
      name: "Inara's address",
      cityId: 4,
      fullAddress: "Baku meydan",
      latitude: "40.4093",
      longitude: "49.8671",
    },
    {
      name: "John's address",
      cityId: 5,
      fullAddress: "London meydan",
      latitude: "51.5074",
      longitude: "0.1278",
    },
    {
      name: "Maria's address",
      cityId: 6,
      fullAddress: "Madrid meydan",
      latitude: "40.4168",
      longitude: "3.7038",
    },
    {
      name: "Hans's address",
      cityId: 7,
      fullAddress: "Berlin meydan",
      latitude: "52.5200",
      longitude: "13.4050",
    },
    {
      name: "Giovanni's address",
      cityId: 8,

      fullAddress: "Rome meydan",
      latitude: "41.9028",
      longitude: "12.4964",
    },
    {
      name: "Lutfi kirdar address",
      cityId: 1,
      fullAddress: "Harbiye mahallesi",
      latitude: "41.0451",
      longitude: "28.9885",
    },
    {
      name: "Cemil topuzlu address",
      cityId: 1,
      fullAddress: "Harbiye mahallesi",
      latitude: "41.0451",
      longitude: "28.9885",
    },
    {
      name: "Volkswagen arena address",
      cityId: 1,
      fullAddress: "Maslak mahallesi",
      latitude: "41.1055",
      longitude: "29.0230",
    },
    {
      name: "Kucukciftlik park address",
      cityId: 1,
      fullAddress: "Harbiye mahallesi",
      latitude: "41.0451",
      longitude: "28.9885",
    },
    {
      name: "Baku Olympic Stadium address",
      cityId: 4,
      fullAddress: "Baku meydan",
      latitude: "40.4093",
      longitude: "49.8671",
    },
    {
      name: "Wembley Stadium address",
      cityId: 5,
      fullAddress: "London meydan",
      latitude: "51.5074",
      longitude: "0.1278",
    },
    {
      name: "Ali Samiyen Spor Kompleksi address",
      cityId: 1,
      fullAddress: "Maslak mahallesi",
      latitude: "41.1055",
      longitude: "29.0230",
    },
    {
      name: "Santiago Bernabeu address",
      cityId: 4,
      fullAddress: "Madrid meydan",
      latitude: "40.4168",
      longitude: "3.7038",
    },
  ];
  const newcustomers = [
    {
      firstname: "Mustafa",
      lastname: "Evleksiz",
      username: "mustafae",
      password: "123456",
      email: " mustafa@test.com",
      addressId: 1,
    },
    {
      firstname: "Inara",
      lastname: "Mammadova",
      username: "inaramammadova",
      password: "123456",
      email: "inara@test.com",
      addressId: 2,
    },
  ];

  const newplaces = [
    {
      name: "Lutfi kirdar",
      addressId: 7,
      openHour: "14:00",
      closeHour: "23:30",
      isActive: true,
    },
    {
      name: "Cemil topuzlu",
      addressId: 8,
      openHour: "10:00",
      closeHour: "23:00",
      isActive: true,
    },
    {
      name: "Volkswagen arena",
      addressId: 9,
      openHour: "16:00",
      closeHour: "23:00",
      isActive: true,
    },
    {
      name: "Kucukciftlik park",
      addressId: 10,
      openHour: "16:00",
      closeHour: "23:00",
      isActive: true,
    },

    {
      name: "Baku Olympic Stadium",
      addressId: 11,
      openHour: "16:00",
      closeHour: "23:00",
      isActive: true,
    },
    {
      name: "Wembley Stadium",
      addressId: 12,
      openHour: "16:00",
      closeHour: "23:00",
      isActive: true,
    },
    {
      name: "Ali Samiyen Sports Complex",
      addressId: 13,
      openHour: "15:00",
      closeHour: "23:00",
      isActive: true,
    },
    {
      name: "Santiago Bernabeu complex",
      addressId: 14,
      openHour: "16:00",
      closeHour: "23:00",
      isActive: true,
    },
  ];

  const newstages = [
    {
      name: "Lutfi kirdar stage 1",
      isIndoor: false,
      placeId: 1,
      capacityNormal: 10,
      capacityVip: 3,
    },
    {
      name: "Lutfi kirdar stage 2",
      isIndoor: true,
      placeId: 1,
      capacityNormal: 5,
      capacityVip: 3,
    },
    {
      name: "Cemil topuzlu stage 1",
      isIndoor: false,
      placeId: 2,
      capacityNormal: 5,
      capacityVip: 2,
    },
    {
      name: "Nef Stadyumu",
      isIndoor: false,
      placeId: 7,
      capacityNormal: 20,
      capacityVip: 6,
    },
    {
      name: "Santiago barnebou stadium",
      isIndoor: false,
      placeId: 8,
      capacityNormal: 20,
      capacityVip: 6,
    },
  ];

  const newevents = [
    {
      name: "Çılgın Buluşma - Resim Sergisi",
      price: 100,
      date: "2021-07-19T12:11:10.741Z",
      duration: "1:00:00",
      description:
        "Çılgın Buluşmaya hazır mısınız? ☺️ Nasrah Nefer, Ayşe Akalın Yalçındağ ve Serpil Topaloğlu 'nun sanatının buluştuğu resim sergisi 19 Temmuz Çarşamba günü saat 17.30'da sizlerle.",
      eventImages:
        "https://www.izmir.art/imgServ/img/uploads/image-53817a46a79c751c3cdf047a254551458efcda01.png",
      eventType: 3,
      stageIds: [1, 2],
    },
    {
      name: "Başka Sinema Film Geceleri",
      price: 150,
      date: "2021-07-15T12:11:10.741Z",
      duration: "1:30:00",
      description:
        "Başka Sinema, ulusal ve uluslararası bağımsız filmlerin gösterilmesi için mekan ve imkan yaratarak, gişe filmlerine alternatif olacak kaliteli sinema ürünlerini izleyiciyle buluşturma hedefiyle ve KARİYO ABABAY VAKFI’nın desteğiyle hayata geçirilmiş bir projedir. 1 Kasım 2013’te 2 şehirde toplam 4 salonda faaliyet göstermeye başlayan BAŞKA SİNEMA Ocak 2023 itibarıyla 18 şehirde gösterilmiştir.",
      eventImages:
        "https://www.izmir.art/500/600/img/uploads/image-201934286314459212e684ca1223911816987dff.png",
      eventType: 1,
      stageIds: [2, 3],
    },
    {
      name: "Kadıköy Belediyesi Çocuk Tiyatrosu",
      price: 50,
      date: "2021-07-15T12:11:10.741Z",
      duration: "1:30:00",
      description:
        "Kadıköy Belediyesi Çocuk Tiyatrosu, çocukların tiyatroyla tanışmasını sağlamak, tiyatro kültürünü geliştirmek, çocukların sanatla iç içe olmasını sağlamak amacıyla 2005 yılında kurulmuştur. 2005 yılından bu yana 15 yıldır çocuklarımızın tiyatro ile buluşmasını sağlayan Kadıköy Belediyesi Çocuk Tiyatrosu, 2019-2020 sezonunda 10 farklı oyunu 10 farklı sahnede 10.000 çocuğumuzla buluşturmuştur. 2020-2021 sezonunda da çocuklarımızın tiyatro ile buluşmasını sağlamak amacıyla 10 farklı oyunu 10 farklı sahnede 10.000 çocuğumuzla buluşturmayı hedeflemektedir.",
      eventImages:
        "https://www.izmir.art/500/600/img/uploads/image-201934286314459212e684ca1223911816987dff.png",
      eventType: 3,
      stageIds: [3],
    },
    {
      name: "Galatasaray - Fenerbahce",
      price: 700,
      date: "2023-07-10T12:11:10.741Z",
      duration: "1:30:00",
      description:
        "Dev istanbul derbisinde gülen kim olacak. Ligin kritik maçında galatasaray ile fenerbahce karşı karşıya geliyor. Maçın biletlerini kaçırmayın.",
      eventImages:
        "https://idsb.tmgrup.com.tr/ly/uploads/images/2023/01/09/250718.jpg,https://i.fanatik.com.tr/i/fanatik/75/0x410/647ccda480a03315e4f42c3d.jpg,https://i2.sdacdn.com/haber/2023/06/04/zaniolo-gol-izle-gs-fb-derbi-zaniolo-gol-izle-15995769_2861_amp.jpg",
      eventType: 2,
      stageIds: [4],
    },
    {
      name: "Real Madrid - Barcelona",
      price: 1200,
      date: "2023-07-08T12:11:10.741Z",
      duration: "1:30:00",
      description:
        "Dev ispanya derbisinde gülen kim olacak. Ligin kritik maçında real madrid ile barcelona karşı karşıya geliyor. Maçın biletlerini kaçırmayın.",
      eventImages:
        "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt87239a238637294c/63f36d813bf6f711199fdf45/22f81d2a-43df-46b2-ad3d-5207848557ef.jpg?auto=webp&format=pjpg&width=1920&quality=60,https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt99e3a230fe87a117/60dbe98e892a730f58850677/52d253adf373db56b90500e53369dab71821f208.jpg?auto=webp&format=pjpg&width=1920&quality=60,https://cdnuploads.aa.com.tr/uploads/Contents/2020/10/24/thumbs_b_c_639925f0dc392927f5a18dc52b975c9b.jpg?v=195213",
      eventType: 2,
      stageIds: [5],
    },
    {
      name: "Algılanan Dünyalar",
      price: 1700,
      date: "2023-07-15T12:11:10.741Z",
      duration: "2:30:00",
      description: "Algılanan Dünyalar, 2023 yılında 4. kez düzenleniyor.",
      eventImages:
        "https://www.izmir.art/500/600/img/uploads/image-201934286314459212e684ca1223911816987dff.png",
      eventType: 3,
      stageIds: [2],
    },
    {
      name: "İzmir Uluslararası Kısa Film Festivali",
      price: 1700,
      date: "2023-07-15T12:11:10.741Z",
      duration: "2:30:00",
      description:
        "İzmir Uluslararası Kısa Film Festivali, 2023 yılında 4. kez düzenleniyor.",
      eventImages:
        "https://www.izmir.art/500/600/img/uploads/image-201934286314459212e684ca1223911816987dff.png",
      eventType: 3,
      stageIds: [],
    },
  ];
  const newratings = [
    {
      eventId: 1,
      customerId: 1,
      ratingValue: 5,
      comment: "Çok güzel bir etkinlikti.",
    },

    {
      eventId: 2,
      customerId: 2,
      ratingValue: 4,
      comment: "Sonuna doğru sıkıcı olsada güzel bir etkinlikti",
    },
    {
      eventId: 3,
      customerId: 2,
      ratingValue: 3,
      comment: "Biletler çok pahalıydı",
    },

    {
      eventId: 4,
      customerId: 1,
      ratingValue: 5,
      comment: "Çok güzel bir maçtı.",
    },
  ];

  const handleGenerateData = async () => {
    try {
      await newcountries.map(async (country) => {
        await createCountry(country);
      });
      await newcities.map(async (city) => {
        await createCity(city);
      });
      await newaddresses.map(async (address) => {
        await createAddress(address);
      });
      await newcustomers.map(async (customer) => {
        await createCustomer(customer);
      });
      await newplaces.map(async (place) => {
        await createPlace(place);
      });
      await newstages.map(async (stage) => {
        await createStage(stage);
      });

      await newevents.map(async (event) => {
        await createEvent(event);
      });
      await newratings.map(async (rating) => {
        await createRating(rating);
      });

      alert("Data Generated!");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteData = async () => {
    try {
      setLoading(true);
      await axios.get("https://localhost:7169/api/event/deleteAll");
      fetchCountry();
      fetchCity();
      fetchAddress();
      fetchPlace();
      fetchStage();
      fetchCustomer();
      fetchEventImage();
      fetchEvent();
      fetchRating();
      fetchEventStage();
      fetchTicket();
      fetchEventSeats();
      fetchSeats();
      alert("Data Deleted!");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    isAdmin && (
      <div className="adminPage">
        <h1>Admin Page</h1>
        <div className="adminPage__container">
          <div
            className="btn"
            style={{
              marginRight: "4rem",
              color: "white",
              backgroundColor: "green",
            }}
            onClick={() => handleGenerateData()}
          >
            Generate Data
          </div>
          <div className="btn btn-warning" onClick={() => handleDeleteData()}>
            Delete Data
          </div>
        </div>

        <CreateCountryForm
          createCountry={createCountry}
          deleteCountry={deleteCountry}
        />
        <CreateCityForm createCity={createCity} deleteCity={deleteCity} />
        <CreateAddressForm
          createAddress={createAddress}
          deleteAddress={deleteAddress}
        />
        <CreatePlaceForm
          createAddress={createAddress}
          createPlace={createPlace}
          deletePlace={deletePlace}
        />
        <CreateStageForm
          fetchPlace={fetchPlace}
          createStage={createStage}
          deleteStage={deleteStage}
        />
        <CreateCustomerForm
          createCustomer={createCustomer}
          deleteCustomer={deleteCustomer}
        />

        <CreateEventForm
          deleteEvent={deleteEvent}
          createEvent={createEvent}
          createEventImage={createEventImage}
          createEventStage={createEventStage}
        />
        <CreateEventImageForm
          createEventImage={createEventImage}
          deleteEventImage={deleteEventImage}
        />
        <CreateRatingForm
          createRating={createRating}
          deleteRating={deleteRating}
        />
        <CreateEventStageForm
          createEventStage={createEventStage}
          deleteEventStage={deleteEventStage}
        />
        <CreateTicketForm
          createTicket={createTicket}
          deleteTicket={deleteTicket}
        />
        <ListEventSeatsForm deleteEventSeat={deleteEventSeat} />
        <ListSeatsForm deleteSeat={deleteSeat} />
      </div>
    )
  );
}

export default AdminPage;
