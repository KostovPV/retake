import { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import RoleForm from "../components/RoleForm";
import RoleList from "../components/RoleList";

function ActorView() {
    const { actors, roles, movies, updateActors, updateRoles } = useContext(DataContext);
    const [selectedActorId, setSelectedActorId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ FullName: "", Birthdate: "" });
    const [newActor, setNewActor] = useState({ FullName: "", Birthdate: "" });
    const [searchTerm, setSearchTerm] = useState("");


    const handleSelectActor = (id) => {
        setSelectedActorId(String(id));
        setIsEditing(false);
    };

    const handleEditClick = () => {
        const actor = actors.find((a) => String(a.ID) === String(selectedActorId));
        setEditData({
            FullName: actor.FullName,
            Birthdate: actor.Birthdate || "",
        });
        setIsEditing(true);
    };

    const handleSave = () => {
        const updated = actors.map((a) =>
            String(a.ID) === String(selectedActorId)
                ? { ...a, FullName: editData.FullName, Birthdate: editData.Birthdate }
                : a
        );
        updateActors(updated);
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this actor?")) {
            const updated = actors.filter((a) => String(a.ID) !== String(selectedActorId));
            updateActors(updated);

            // Also remove their roles
            const updatedRoles = roles.filter((r) => String(r.ActorID) !== String(selectedActorId));
            updateRoles(updatedRoles);

            setSelectedActorId(null);
            setIsEditing(false);
        }
    };

    const handleCreate = () => {
        if (!newActor.FullName) {
            alert("Full Name is required");
            return;
        }

        const nextId = Math.max(0, ...actors.map((a) => Number(a.ID))) + 1;
        const created = { ID: String(nextId), ...newActor };
        updateActors([...actors, created]);
        setNewActor({ FullName: "", Birthdate: "" });
    };

    const handleAddRole = (newRole) => {
        const nextId = Math.max(0, ...roles.map((r) => Number(r.ID))) + 1;
        const created = { ID: String(nextId), ...newRole };
        updateRoles([...roles, created]);
    };

    const handleUpdateRole = (roleId, updatedFields) => {
        const updated = roles.map((r) =>
            String(r.ID) === String(roleId)
                ? { ...r, ...updatedFields }
                : r
        );
        updateRoles(updated);
    };


    const handleDeleteRole = (roleId) => {
        const updated = roles.filter((r) => String(r.ID) !== String(roleId));
        updateRoles(updated);
    };

    const selectedActor = actors.find((a) => String(a.ID) === String(selectedActorId));
    const selectedRoles = roles.filter((r) => String(r.ActorID) === String(selectedActorId));

    return (
        <div className="actor-view">
            <input
                type="text"
                placeholder="Search actors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: "10px", padding: "5px", width: "200px" }}
            />

            <h2>Actor List</h2>

            {/* Create New Actor */}
            <div style={{ marginBottom: "20px" }}>
                <h3>Add New Actor</h3>
                <input
                    value={newActor.FullName}
                    onChange={(e) => setNewActor({ ...newActor, FullName: e.target.value })}
                    placeholder="Full Name"
                />
                <input
                    value={newActor.Birthdate}
                    onChange={(e) => setNewActor({ ...newActor, Birthdate: e.target.value })}
                    placeholder="Birthdate"
                />
                <button onClick={handleCreate}>Create</button>
            </div>

            {/* Actor List */}
            {actors.length > 0 ? (
                <ul>
                    {actors
                        .filter((actor) =>
                            actor.FullName.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((actor) => (

                            <li
                                key={actor.ID}
                                onClick={() => handleSelectActor(actor.ID)}
                                style={{
                                    cursor: "pointer",
                                    fontWeight: actor.ID === selectedActorId ? "bold" : "normal",
                                }}
                            >
                                {actor.FullName}
                            </li>
                        ))}
                </ul>
            ) : (
                <p>Loading actors...</p>
            )}

            {/* Selected Actor Details */}
            {selectedActor && (
                <div style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
                    {isEditing ? (
                        <>
                            <h3>Edit Actor</h3>
                            <input
                                value={editData.FullName}
                                onChange={(e) => setEditData({ ...editData, FullName: e.target.value })}
                                placeholder="Full Name"
                            />
                            <input
                                value={editData.Birthdate}
                                onChange={(e) => setEditData({ ...editData, Birthdate: e.target.value })}
                                placeholder="Birthdate"
                            />
                            <div>
                                <button onClick={handleSave}>Save</button>
                                <button onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h3>{selectedActor.FullName}</h3>
                            <p>
                                <strong>Birthdate:</strong> {selectedActor.Birthdate || "Unknown"}
                            </p>
                            <div>
                                <button onClick={handleEditClick}>Edit</button>
                                <button onClick={handleDelete}>Delete</button>
                            </div>

                            {/* Role management */}
                            <RoleForm actorId={selectedActor.ID} movies={movies} onAddRole={handleAddRole} />
                            <RoleList roles={selectedRoles} movies={movies} onDelete={handleDeleteRole} onUpdate={handleUpdateRole} />
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default ActorView;
