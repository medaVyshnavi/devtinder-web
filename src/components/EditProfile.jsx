import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import {addUser} from "../app/userSlice"

const EditProfile = ({ user }) => {
  const dispatch = useDispatch()
  const { firstName, lastName, age, gender, about, photoURL } = user;
  const [userProfile, setUserProfile] = useState({
    firstName: firstName,
    lastName: lastName,
    age: age,
    gender: gender,
    photoURL: photoURL,
    about: about,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(BASE_URL + "/profile/edit", { firstName:userProfile.firstName,lastName:userProfile.lastName, age:userProfile.age, about:userProfile.about, photoURL:userProfile.photoURL, gender:userProfile.gender }, { withCredentials: true })
      dispatch(addUser(response.data.data))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center rounded-md bg-base-300 w-1/2 my-2 p-4 overflow-y-auto m-auto justify-center">
      <div className="w-full mx-[50%] ">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">First Name </legend>
          <input
            value={userProfile.firstName}
            onChange={(e) => handleChange(e)}
            type="text"
            className="input w-80"
            name="firstName"
            placeholder="First Name"
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Last Name </legend>
          <input
            value={userProfile.lastName}
            onChange={(e) => handleChange(e)}
            type="text"
            className="input"
            name="lastName"
            placeholder="Last Name"
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Photo URL </legend>
          <input
            value={userProfile.photoURL}
            onChange={(e) => handleChange(e)}
            type="text"
            className="input"
            name="photoURL"
            placeholder="Photo URL"
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Age </legend>
          <input
            value={userProfile.age}
            onChange={(e) => handleChange(e)}
            type="text"
            className="input"
            name="age"
            placeholder="age"
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Gender</legend>
          <select
            className="select"
            name="gender"
            value={userProfile.gender}
            onChange={(e) => handleChange(e)}
          >
            <option>male</option>
            <option>female</option>
            <option>others</option>
          </select>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Your bio</legend>
          <textarea
            className="textarea h-24"
            name="about"
            placeholder="About Section"
            value={userProfile.about}
            onChange={(e) => handleChange(e)}
          />
        </fieldset>
        <div className="card-actions justify-center mt-5 mr-4">
          <button
            className="btn btn-primary w-full"
            onClick={handleSubmit}
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
