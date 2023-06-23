import axios from "axios";

import React, { Component } from "react";
import { useState, useEffect } from "react";

function TicketEvent() {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    const eventModel = {
        id: 0,
        name: "",
        description: "",
        date: "",
        avgRating: 0,
        evenImages:[],
        duration: 0,
        eventStages: [],
        isActive: true,
        isAvailable: true,
        isOnSale: true,
        eventType: 0,
        price: 0,
        location: ""
    };

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get("https://localhost:7169/api/event");
                setEvent(res.data);
               
               
            } catch (error) {
                
                console.log(error);
                
            }
            finally {
                setLoading(false);
            }
         
        };
        fetchEvent();
    }
    , []);

    if (loading) {
        return <p>Loading event...</p>;
    }


   {return event&&  (
        <div>
            <h1>Here is events</h1>
            
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>AvgRating</th>
                            <th>Duration</th>
                            <th>Image</th>
                            <th>IsActive</th>
                            <th>IsAvailable</th>
                            <th>IsOnSale</th>
                            <th>EventType</th>
                            <th>Price</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>

                    {event.map((event) => (
                        <tr key={event.id}>
                            <td>{event.id}</td>
                            <td>{event.name}</td>
                            <td>{event.description}</td>
                            <td>{event.date}</td>
                            <td>{event.avgRating}</td>
                            <td>{event.duration}</td>
                            {/* {[event.eventImages.map((eventImage) => (
                                <p>{eventImage.urlAddress}</p>
                                ))
                            ]} */}
                            {
                              
                               
                                console.log(Array(event.eventImages[0]==null?"No no":event.eventImages[0].urlAddress))
                             
                            }
                            <img style={{width:200}} src={event.eventImages[0]==null?"No no":event.eventImages[0].urlAddress} alt="Sample image" />
                            <td>{event.isActive}</td>
                            <td>{event.isAvailable}</td>
                            <td>{event.isOnSale}</td>
                            <td>{event.eventType}</td>
                            <td>{event.price}</td>
                            <td>{event.location}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

        </div>
    );}

}

export default TicketEvent;