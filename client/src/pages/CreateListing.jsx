import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const timestamp = new Date().getTime();
  const [formData, setFormData] = useState({
    image: `https://source.unsplash.com/random/900x700/?vendor&timestamp=${timestamp}`,
    vendorName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Vendor Name"
            className="border p-3 rounded-lg"
            id="vendorName"
            maxLength="62"
            minLength="1" // Updated minLength value
            required
            onChange={handleChange}
            value={formData.vendorName}
          />

          <input
            type="text"
            placeholder="Contact Person"
            className="border p-3 rounded-lg"
            id="contactPerson"
            maxLength="62"
            minLength="1" // Updated minLength value
            required
            onChange={handleChange}
            value={formData.contactPerson} // Corrected value property
          />

          <input
            type="email" // Updated input type to email
            placeholder="Email"
            className="border p-3 rounded-lg"
            id="email"
            maxLength="62"
            minLength="1" // Updated minLength value
            required
            onChange={handleChange}
            value={formData.email} // Corrected value property
          />

          <input
            type="tel" // Updated input type to tel for phone number
            placeholder="Phone"
            className="border p-3 rounded-lg"
            id="phone"
            maxLength="62"
            minLength="1" // Updated minLength value
            required
            onChange={handleChange}
            value={formData.phone} // Corrected value property
          />

          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />

          <button
            disabled={loading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Creating..." : "Create listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
