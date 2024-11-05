import "./Profile.scss";
import { NavLink } from "react-router-dom";
function Profile({ profile, setProfile }) {
  // Handlers 👇:
  const handleFirstNameChange = (event) =>
    setProfile({ ...profile, firstName: event.target.value });
  const handleLastNameChange = (event) =>
    setProfile({ ...profile, lastName: event.target.value });
  const handleAgeChange = (event) =>
    setProfile({ ...profile, age: event.target.value });
  const handleGroupCodeChange = (event) =>
    setProfile({ ...profile, groupCode: event.target.value });
  const handleCaseCodeChange = (event) =>
    setProfile({ ...profile, caseCode: event.target.value });
  const handleGenderChange = (event) => {
    if (event.target.checked) {
      setProfile({ ...profile, gender: event.target.value });
    }
  };
  // setProfile({ ...profile, gender: event.target.value });
  // Handlers 👆

  return (
    <section className="Profile">
      <legend>ُSubject Info</legend>
      <form>
        <div>
          <label htmlFor="firstName">Name</label>
          <input
            type="text"
            id="firstName"
            value={profile.firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={profile.lastName}
            onChange={handleLastNameChange}
          />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="text"
            id="age"
            value={profile.age}
            onChange={handleAgeChange}
          />
        </div>
        <div className="gender">
          <fieldset>
            <legend>Gender</legend>

            <div>
              <label htmlFor="man">male</label>
              <input
                type="radio"
                id="man"
                name="gender"
                value="male"
                onChange={handleGenderChange}
              />
            </div>

            <div>
              <label htmlFor="woman">female</label>
              <input
                type="radio"
                id="woman"
                name="gender"
                value="female"
                onChange={handleGenderChange}
              />
            </div>
          </fieldset>
        </div>
        <div>
          <label htmlFor="groupCode">Group Code</label>
          <input
            type="text"
            id="groupCode"
            value={profile.groupCode}
            onChange={handleGroupCodeChange}
          />
        </div>
        <div>
          <label htmlFor="caseCode">Subject Code</label>
          <input
            type="text"
            id="caseCode"
            value={profile.caseCode}
            onChange={handleCaseCodeChange}
          />
        </div>
      </form>

      <NavLink to="/test/type-select">Save & Continue</NavLink>
    </section>
  );
}

export default Profile;
