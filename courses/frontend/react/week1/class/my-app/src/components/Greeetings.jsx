const Greeetings = () => {
    const name = "John";
    const getFullName = (firstName, lastName) => {
        return firstName + " " + lastName;
    }
    const arrayjx = [1, 2, 3, 4, 5];
    const doubleArray = arrayjx.map(item => item * 2);
  return (
    <>
        <h1 className={styles.greeting}>Hello {name}</h1>
        <p>This is a paragraph</p>
        <h2> My name is: {getFullName(name, "Doe")}</h2>
        {/* this is a comment */}
        {doubleArray.map(item => <p>{item}</p>)}

    </>
  );
};

const Navbar

export default Greeetings;