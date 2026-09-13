import useSchool from "@/store/admin/context/school.context";
import React, { useEffect } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaSchool,
  FaIdBadge,
} from "react-icons/fa";

const School = () => {
  const { state, schoolList } = useSchool();

  useEffect(() => {
    schoolList();
  }, []);

  return (
    <div className="">
      {state?.schoolList?.map((cur: any) => (
        <div key={cur._id} className="flex justify-center">
          {/* Top Gradient */}

          <div className="p-2">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Logo */}
              <div className="flex-shrink-0">
                <div className="w-28 h-28 s border-blue-100 shadow-md overflow-hidden bg-white">
                  <img
                    src={`/api/photo/school-photo/${cur._id}`}
                    alt={cur.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* School Information */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-extrabold uppercase text-slate-800 tracking-wide">
                  {cur.name}
                </h1>

                <p className="text-blue-900 font-medium mt-1 flex justify-center md:justify-start items-center gap-2">
                  <FaSchool />
                  Excellence • Discipline • Education
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mt-6 text-slate-700">
                  <div className="flex items-center gap-3">
                    <FaIdBadge className="text-blue-400 text-lg" />
                    <span>
                      <strong>Affiliation Code:</strong> {cur.code}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-blue-600 text-lg" />
                    <span>{cur.email}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaPhoneAlt className="text-blue-600 text-lg" />
                    <span>{cur.contact}</span>
                  </div>

                  <div className="flex items-start gap-3 sm:col-span-2">
                    <FaMapMarkerAlt className="text-blue-600 text-lg mt-1" />
                    <span>{cur.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Information Bar */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default School;
