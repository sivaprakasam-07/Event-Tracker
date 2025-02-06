// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";

// function CreateEvent() {
//   const [eventData, setEventData] = useState({
//     title: '',
//     date: '',
//     time: '',
//     venue: '',
//     description: '',
//     eventLink: '',
//     department: '',
//     eligibility: '' // Add eligibility to the state
//   });
//   const navigate = useNavigate();


  
//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   const events = JSON.parse(localStorage.getItem('events') || '[]');
//   //   const newEvent = {
//   //     id: Date.now(),
//   //     ...eventData,
//   //   };
//   //   events.push(newEvent);
//   //   localStorage.setItem('events', JSON.stringify(events));
//   //   navigate('/events');
//   // };

//   async function handleCreateEvent(eventData) {

//     try{
//       const response = await axios.post("http://localhost:5000/event/createEvent", eventData);
//       console.log("Succesfully created the event", response.data);
//       navigate('/events');
//     }catch(err){
//       console.err("Error has occured while creating evnet");
//     }
//   }
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEventData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
//       <form onSubmit={handleCreateEvent} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Title</label>
//           <input
//             type="text"
//             name="title"
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             value={eventData.title}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Date</label>
//           <input
//             type="date"
//             name="date"
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             value={eventData.date}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Time</label>
//           <input
//             type="time"
//             name="time"
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             value={eventData.time}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Venue</label>
//           <input
//             type="text"
//             name="venue"
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             value={eventData.venue}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Event Link</label>
//           <input
//             type="url"
//             name="eventLink"
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             value={eventData.eventLink}
//             onChange={handleChange}
//             placeholder="https://example.com"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Description</label>
//           <textarea
//             name="description"
//             rows="4"
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             value={eventData.description}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Department</label>
//           <select
//             name="department"
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             value={eventData.department}
//             onChange={handleChange}
//           >
//             <option value="">Select Department</option>
//             <option value="CSE">CSE</option>
//             <option value="IT">IT</option>
//             <option value="ADS">ADS</option>
//             <option value="AIML">AIML</option>
//             <option value="ECE">ECE</option>
//             <option value="EEE">EEE</option>
//             <option value="EEE">Bio-Technology</option>
//             <option value="EEE">Chemical Engineering</option>
//             {/* Add more departments as needed */}
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Eligibility</label>
//           <textarea
//             name="eligibility"
//             rows="2"
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             value={eventData.eligibility}
//             onChange={handleChange}
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//         >
//           Create Event
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CreateEvent;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateEvent() {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    description: '',
    eventLink: '',
    department: '',
    eligibility: ''
  });
  const navigate = useNavigate();

  // This function will handle the form submit
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent form from reloading page
    try {
      // Send the eventData to the backend
      const response = await axios.post("http://localhost:3000/event/createEvent", eventData,{
        headers: {
          "Content-Type": "application/json", // Make sure the correct header is set
        }});
      console.log('Successfully created the event:', response.data);
      navigate('/events');  // Redirect to events page
    } catch (err) {
      console.error('Error occurred while creating event:', err);
      alert('Error occurred while creating event. Please try again.');
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={eventData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={eventData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <input
            type="time"
            name="time"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={eventData.time}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Venue</label>
          <input
            type="text"
            name="venue"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={eventData.venue}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Event Link</label>
          <input
            type="url"
            name="eventLink"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={eventData.eventLink}
            onChange={handleChange}
            placeholder="https://example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={eventData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <select
            name="department"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={eventData.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ADS">ADS</option>
            <option value="AIML">AIML</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="Bio-Tech">Bio-Technology</option>
            <option value="Chemical">Chemical Engineering</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Eligibility</label>
          <textarea
            name="eligibility"
            rows="2"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={eventData.eligibility}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;
