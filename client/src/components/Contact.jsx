import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const result = await fetch(`/api/user/${listing.userRef}`);
        const data = await result.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
        console.log("error in fetching API or user not found");
        navigate("/signin");
      }
    }
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <div>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>{" "}
          </p>
          <textarea
            className="w-full border p-3 rounded-lg"
            placeholder="Enter your message with contact number..."
            name="message"
            id="message"
            rows="3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-blue-950 text-white font-semibold text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </div>
  );
}

export default Contact;
