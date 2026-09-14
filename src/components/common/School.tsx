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
    <div className="w-full">
      {state?.schoolList?.map((cur: any) => (
        <div
          key={cur._id}
          className="flex items-center gap-4 border-b border-slate-200 py-3"
        >
          {/* Logo */}
          <div className="w-20 h-20 shrink-0 overflow-hidden rounded-md bg-white shadow-sm">
            <img
              src={`/api/photo/school-photo/${cur._id}`}
              alt={cur.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* School Details */}
          <div className="min-w-0 flex-1">
            <h1 className="text-xl md:text-2xl font-bold uppercase text-slate-800">
              {cur.name}
            </h1>

            <p className="flex items-center gap-2 text-sm text-blue-800 mt-0.5">
              <FaSchool />
              Excellence • Discipline • Education
            </p>

            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-600">
              <span className="flex items-center gap-1.5">
                <FaIdBadge className="text-blue-500" />
                <strong>Code:</strong> {cur.code}
              </span>

              <span className="flex items-center gap-1.5">
                <FaEnvelope className="text-blue-500" />
                {cur.email}
              </span>

              <span className="flex items-center gap-1.5">
                <FaPhoneAlt className="text-blue-500" />
                {cur.contact}
              </span>

              <span className="flex items-center gap-1.5">
                <FaMapMarkerAlt className="text-blue-500 shrink-0" />
                {cur.address}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default School;
