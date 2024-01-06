import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Loading.css';
import {
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaShare,
} from 'react-icons/fa';

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <div id="page" className='p-28'>
            <div id="container">
              <div id="ring2"></div>
              <div id="ring2"></div>
              <div id="ring2"></div>
              <div id="ring2"></div>
              <div id="h3">loading</div>
            </div>
          </div>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${listing.image}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div> 
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {listing.vendorName}
            </p>
            <p className=''>
              {listing.contactPerson}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Email - </span>
              {listing.email}
            </p>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Phone - </span>
              {listing.phone}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
