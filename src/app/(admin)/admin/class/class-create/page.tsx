"use client";

/* ============================================================
   COMMON COMPONENTS
   ------------------------------------------------------------
   Reusable UI components used throughout the School ERP.
============================================================ */

import Button from "@/components/common/Button";
import FormContainer from "@/components/common/FormContainer";
import InputField from "@/components/common/InputField";
import Loader from "@/components/common/Loader";
import PageContent from "@/components/common/PageContent";
import PageHeader from "@/components/common/PageHeader";
import PageLayout from "@/components/common/PageLayout";
import Row from "@/components/common/Row";
import SectionCard from "@/components/common/SectionCard";

/* ============================================================
   CLASS CONTEXT
   ------------------------------------------------------------
   useClass provides:
   - state       → class form data and loading state
   - handleChange → updates form fields
   - handleSubmit → submits class data to the API
============================================================ */

import useClass from "@/store/admin/context/class.context";

/* ============================================================
   ICONS
============================================================ */

import { FaDoorOpen, FaLayerGroup } from "react-icons/fa";

import { MdOutlineClass } from "react-icons/md";

/* ============================================================
   PAGE HEADER CONFIGURATION
   ------------------------------------------------------------
   Configuration passed to the common PageHeader component.

   name:
     Page title.

   subHeading:
     Short description of the page.

   href:
     URL used by the header button.

   btnHeading:
     Text displayed on the header button.

   icon:
     Icon displayed with the page heading.
============================================================ */

const heading = {
  name: "Class Register",
  subHeading: "Add and manage your class basic information.",
  href: "/admin/class/class-list",
  btnHeading: "Class List",
  icon: <MdOutlineClass />,
};

/* ============================================================
   CLASS CREATE COMPONENT
============================================================ */

const ClassCreate = () => {
  /* ------------------------------------------------------------
     GET CLASS STATE AND HANDLERS FROM CONTEXT
     ------------------------------------------------------------
     state:
       Contains classObj and loading state.

     handleChange:
       Handles changes in select/input fields.

     handleSubmit:
       Handles form submission.
  ------------------------------------------------------------ */

  const { state, handleChange, handleSubmit } = useClass();

  return (
    <PageLayout>
      {/* ========================================================
          PAGE HEADER
          --------------------------------------------------------
          Displays:
          - Class Register title
          - Page description
          - Class List button
      ======================================================== */}

      <PageHeader heading={heading} />

      {/* ========================================================
          PAGE CONTENT
          --------------------------------------------------------
          Provides the main content area of the page.
      ======================================================== */}

      <PageContent>
        {/* ======================================================
            CLASS FORM
            ------------------------------------------------------
            FormContainer is the common form wrapper used in
            the ERP.

            handleSubmit is responsible for creating the class.
        ====================================================== */}

        <FormContainer onSubmit={(e) => handleSubmit(e)}>
          {/* ====================================================
              LOADING STATE
              ----------------------------------------------------
              Shows the loader while the class is being submitted
              or an API request is in progress.
          ==================================================== */}

          {state.loading && <Loader />}

          {/* ====================================================
              CLASS PROFILE SECTION
              ----------------------------------------------------
              Contains the basic information required to create
              a class.
          ==================================================== */}

          <SectionCard title="Create Class Profile" icon={<MdOutlineClass />}>
            {/* ==================================================
                CLASS NAME + SECTION
                --------------------------------------------------
                First row contains:
                1. Class selection
                2. Section name
            ================================================== */}

            <Row>
              {/* =================================================
                  CLASS SELECTION
                  -------------------------------------------------
                  The administrator selects the class from the
                  predefined school classes.

                  Example:
                  P.NC → N.C → K.G → I → II → ... → XII
              ================================================= */}

              <div className="flex-1/2">
                <label className="mb-2 block py-1 text-sm font-medium text-gray-700">
                  Select Class
                </label>

                {/* ------------------------------------------------
                    CLASS DROPDOWN

                    The selected value is handled by handleChange()
                    from the class context.
                ------------------------------------------------ */}

                <select
                  onChange={(e) => handleChange(e)}
                  name="name"
                  className="w-full border py-2.5"
                >
                  {/* ------------------------------------------------
                      PRE-PRIMARY CLASSES
                  ------------------------------------------------ */}

                  <option value="pnc">P.NC</option>

                  <option value="nc">N.C</option>

                  <option value="kg">K.G</option>

                  {/* ------------------------------------------------
                      PRIMARY CLASSES
                  ------------------------------------------------ */}

                  <option value="i">I</option>

                  <option value="ii">II</option>

                  <option value="iii">III</option>

                  <option value="iv">IV</option>

                  <option value="V">V</option>

                  {/* ------------------------------------------------
                      MIDDLE SCHOOL CLASSES
                  ------------------------------------------------ */}

                  <option value="vi">VI</option>

                  <option value="vii">VII</option>

                  <option value="viii">VIII</option>

                  {/* ------------------------------------------------
                      SECONDARY CLASSES
                  ------------------------------------------------ */}

                  <option value="ix">IX</option>

                  <option value="x">X</option>

                  {/* ------------------------------------------------
                      SENIOR SECONDARY CLASSES
                  ------------------------------------------------ */}

                  <option value="xi">XI</option>

                  <option value="xii">XII</option>
                </select>
              </div>

              {/* =================================================
                  SECTION NAME
                  -------------------------------------------------
                  Stores the section of the selected class.

                  Example:
                  A
                  B
                  C
              ================================================= */}

              <div className="flex-1/2">
                <InputField
                  name="section"
                  label="Section Name"
                  value={state.classObj.section}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Enter Section name (A,B,C)"
                  icon={<FaLayerGroup />}
                />
              </div>
            </Row>

            {/* ==================================================
                ROOM NUMBER
                --------------------------------------------------
                Stores the classroom/room number assigned to
                the class.

                Example:
                Room 101
                Room 202
                Room 15
            ================================================== */}

            <Row>
              <InputField
                label="Room Number"
                name="no"
                value={state.classObj.no}
                onChange={(e) => handleChange(e)}
                type="number"
                placeholder="Enter room number"
                icon={<FaDoorOpen />}
              />
            </Row>

            {/* ==================================================
                SUBMIT BUTTON
                --------------------------------------------------
                Button submits the class creation form.

                FormContainer's onSubmit will trigger
                handleSubmit().
            ================================================== */}

            <Button />
          </SectionCard>
        </FormContainer>
      </PageContent>
    </PageLayout>
  );
};

export default ClassCreate;
