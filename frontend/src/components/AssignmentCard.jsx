function AssignmentCard({
  assignment,
  updateAssignmentStatus,
  deleteAssignment,
}) {
  return (
    <div>
      <h3>{assignment.title}</h3>

      <p>{assignment.description}</p>

      <p>Status: {assignment.status}</p>

      <button onClick={() => updateAssignmentStatus(assignment, "advance")}>
        Advance Villainy
      </button>

      <button onClick={() => updateAssignmentStatus(assignment, "demote")}>
        Heroic Relapse
      </button>

      <button onClick={() => deleteAssignment(assignment._id)}>
        Fire This Assignment Into A Volcano
      </button>
    </div>
  );
}

export default AssignmentCard;