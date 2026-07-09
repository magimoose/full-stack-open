import Part from './Part.jsx'
const Course = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <strong>
        total of{" "}
        {course.parts.reduce((total, curr) => total + curr.exercises, 0)}{" "}
        exercises
      </strong>
    </div>
  );
};

export default Course

