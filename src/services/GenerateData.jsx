import React from "react";
import axios from "axios";
import { useEffect } from "react";

function GenerateData() {
  const countries = [
    "Turkiye",
    "Azerbeijan",
    "England",
    "Spain",
    "Germany",
    "Italy",
  ];

  const cities = [
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

  const addresses = [
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
  const customers = [
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

  const places = [
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

  const stages = [
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

  const events = [
    {
      name: "Çılgın Buluşma - Resim Sergisi",
      price: 100,
      date: "2021-07-19T12:11:10.741Z",
      duration: "1:00:00",
      description:
        "Çılgın Buluşmaya hazır mısınız? ☺️ Nasrah Nefer, Ayşe Akalın Yalçındağ ve Serpil Topaloğlu 'nun sanatının buluştuğu resim sergisi 19 Temmuz Çarşamba günü saat 17.30'da sizlerle.",
      eventImages:
        "[https://www.izmir.art/imgServ/img/uploads/image-53817a46a79c751c3cdf047a254551458efcda01.png]",
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
      eventType: 2,
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
        "https://i4.hurimg.com/i/hurriyet/75/0x0/5f0e3e1c0f25440c0c0e3c0d.jpg,https://i4.hurimg.com/i/hurriyet/75/0x0/5f0e3e1c0f25440c0c0e3c0d.jpg,https://i4.hurimg.com/i/hurriyet/75/0x0/5f0e3e1c0f25440c0c0e3c0d.jpg",
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
  const ratings = [
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

  useEffect(() => {
    const generateData = async () => {
      try {
        await axios.post("http://localhost:5000/api/country", countries);
        console.log("country generated");
        await axios.post("http://localhost:5000/api/city", cities);
        console.log("city generated");
        await axios.post("http://localhost:5000/api/address", addresses);
        console.log("address generated");
        await axios.post("http://localhost:5000/api/place", places);
        console.log("place generated");
        await axios.post("http://localhost:5000/api/customers", customers);
        console.log("customer generated");
        await axios.post("http://localhost:5000/api/stages", stages);
        console.log("stage generated");
        await axios.post("http://localhost:5000/api/events", events);
        console.log("event generated");
        await axios.post("http://localhost:5000/api/ratings", ratings);
        console.log("rating generated");
      } catch (error) {
        console.log(error);
      }
    };
    generateData();
  }, []);

  return <>{alert.show("Data generated")}</>;
}

export default GenerateData;
