import { Link } from "react-router-dom";
// below is the ClassCard component, which will be used to display individual classes in the admin dashboard, with options to edit or delete the class
function ClassCard({
  classItem,
  editingClassId,
  editFormData,
  handleEditChange,
  startEditing,
  updateClass,
  cancelEditing,
  deleteClass,
}) {
  return (
    <div>
      {editingClassId === classItem._id ? (
        <>
          <input
            type="text"
            name="name"
            value={editFormData.name}
            onChange={handleEditChange}
          />

          <input
            type="text"
            name="description"
            value={editFormData.description}
            onChange={handleEditChange}
          />

          <button onClick={() => updateClass(classItem._id)}>
            Save Evil Changes
          </button>

          <button onClick={cancelEditing}>
            Cancel This Nonsense
          </button>
        </>
      ) : (
        <>
          <Link to={`/classes/${classItem._id}`}>
            <h4>{classItem.name}</h4>
          </Link>

          <p>{classItem.description}</p>

          <button onClick={() => startEditing(classItem)}>
            Edit This Scheme
          </button>

          <button onClick={() => deleteClass(classItem._id)}>
            Expel This Class From The Academy
          </button>
        </>
      )}
    </div>
  );
}

export default ClassCard;