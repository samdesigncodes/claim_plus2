import React, { useState, useEffect, useRef } from "react";
// import { userService } from "./services/api";

const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
const validateName = (name: string) => /^[A-Za-z]{2,}$/.test(name);

// const triggerStripeCheckout = () => {
//   // Placeholder for Stripe integration
//   alert("Stripe Checkout triggered!");
// };

const App: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [operator, setOperator] = useState("");
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    operator: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [operatorDropdownOpen, setOperatorDropdownOpen] = useState(false);
  const operatorRef = useRef(null);

  // Only Ghana for now
  const country = { code: "+233", flag: "/ghana-flag.svg", name: "Ghana" };
  const operators = [
    { value: "mtn", label: "MTN MoMo", logo: "/mtn_momo.png" },
    {
      value: "airteltigo",
      label: "AirtelTigo Money",
      logo: "/AirtelTigo-Money.jpeg",
    },
    { value: "telecel", label: "Telecel Cash", logo: "/telecel_cash.jpeg" },
  ];

  const validatePhone = (phone: string) =>
    /^\d{9}$/.test(phone.replace(/\s/g, ""));
  const isFormValid =
    validateName(firstName) &&
    validateName(lastName) &&
    validatePhone(phone) &&
    operator;

  const selectedOperator = operators.find((op) => op.value === operator);

  const handleOperatorSelect = (value: string) => {
    setOperator(value);
    setTouched((t) => ({ ...t, operator: true }));
    setOperatorDropdownOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      firstName: true,
      lastName: true,
      phone: true,
      operator: true,
    });
    setError(null);
    setSuccess(false);
    if (!isFormValid) {
      setError("Please fill all fields correctly.");
      return;
    }
    setSuccess(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <form
        className="w-full max-w-md bg-white rounded-lg flex flex-col items-center p-4 md:p-8 shadow-none"
        onSubmit={handleSubmit}
        noValidate
      >
        <img
          src="/logo.svg"
          alt="Plus2 Logo"
          className="mx-auto mb-6"
          style={{ width: "120px", maxWidth: "80vw" }}
        />
        <h1 className="text-2xl md:text-3xl font-bold text-textPrimary text-center mb-2">
          Claim moneylink
        </h1>
        <p className="text-secondary text-center mb-6 text-base md:text-lg">
          Enter your details to claim your money
        </p>
        <div className="flex flex-col md:flex-row w-full gap-4 mb-4">
          <div className="flex-1">
            <label
              htmlFor="firstName"
              className="block text-textSecondary text-sm mb-1"
            >
              First name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className={`w-full rounded-md border px-4 py-3 text-base md:text-lg focus:outline-none transition-colors ${
                touched.firstName && !validateName(firstName)
                  ? "border-error"
                  : touched.firstName && validateName(firstName)
                  ? "border-inputFocus bg-gray-100"
                  : "border-inputBorder bg-gray-50"
              }`}
              placeholder="James"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, firstName: true }))}
              minLength={2}
              required
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="lastName"
              className="block text-textSecondary text-sm mb-1"
            >
              Last name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className={`w-full rounded-md border px-4 py-3 text-base md:text-lg focus:outline-none transition-colors ${
                touched.lastName && !validateName(lastName)
                  ? "border-error"
                  : touched.lastName && validateName(lastName)
                  ? "border-inputFocus bg-gray-100"
                  : "border-inputBorder bg-gray-50"
              }`}
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, lastName: true }))}
              minLength={2}
              required
            />
          </div>
        </div>
        <div className="w-full mb-4">
          <label
            htmlFor="phone"
            className="block text-textSecondary text-sm mb-1"
          >
            Phone number
          </label>
          <div className="flex items-center rounded-md border px-2 py-1 bg-gray-50 focus-within:border-inputFocus">
            <img src={country.flag} alt="Ghana flag" className="w-6 h-6 mr-2" />
            <span className="font-medium mr-2">{country.code}</span>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="flex-1 bg-transparent outline-none border-0 px-2 py-2 text-base md:text-lg"
              placeholder="274443256"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
              maxLength={9}
              required
            />
          </div>
          {touched.phone && !validatePhone(phone) && (
            <div className="text-error text-xs mt-1">
              Enter a valid 9-digit phone number.
            </div>
          )}
        </div>
        <div className="w-full mb-2 relative">
          <label
            htmlFor="operator"
            className="block text-textSecondary text-sm mb-1"
          >
            Identified phone operator
          </label>
          <button
            type="button"
            className={`w-full rounded-md border px-4 py-3 text-base md:text-lg focus:outline-none transition-colors bg-gray-50 flex items-center justify-between ${
              touched.operator && !operator
                ? "border-error"
                : "border-inputBorder"
            }`}
            onClick={() => setOperatorDropdownOpen((open) => !open)}
            ref={operatorRef}
            aria-haspopup="listbox"
            aria-expanded={operatorDropdownOpen}
          >
            {selectedOperator ? (
              <span className="flex items-center">
                <img
                  src={selectedOperator.logo}
                  alt={selectedOperator.label}
                  className="w-6 h-6 mr-2 rounded"
                />
                {selectedOperator.label}
              </span>
            ) : (
              <span className="text-gray-400">Select operator</span>
            )}
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {operatorDropdownOpen && (
            <ul
              className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-auto"
              role="listbox"
            >
              {operators.map((op) => (
                <li
                  key={op.value}
                  className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                    operator === op.value ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleOperatorSelect(op.value)}
                  role="option"
                  aria-selected={operator === op.value}
                >
                  <img
                    src={op.logo}
                    alt={op.label}
                    className="w-6 h-6 mr-2 rounded"
                  />
                  {op.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        {touched.operator && !operator && (
          <div className="text-error text-xs mt-1">
            Please select a phone operator.
          </div>
        )}
        {error && <div className="w-full mb-2 text-error text-sm">{error}</div>}
        {success && (
          <div className="w-full mb-2 text-green-600 text-sm">
            Form submitted successfully!
          </div>
        )}
        <button
          type="submit"
          className={`w-full h-12 rounded-md font-semibold text-lg transition-colors flex items-center justify-center mb-3 ${
            isFormValid
              ? "bg-primary hover:bg-green-500 cursor-pointer"
              : "bg-buttonDisabled cursor-not-allowed"
          } text-white`}
          disabled={!isFormValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
