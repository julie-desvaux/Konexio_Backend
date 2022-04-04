import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Admin() {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		fetch("/users/admin", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			credentials: "same-origin",
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					setUsers(data.data);
					setIsLoading(false);
				}
			})
			.catch((err) => toast.error(err));
	});

	if (isLoading) return <h3>Loading...</h3>;

	return (
		<div className="container">
			<h1 className="m-3 text-center">Admin</h1>
			<div className="row">
				<div className="col">
					<table className="table table-hover">
						<thead>
							<tr>
								<th scope="col">First Name</th>
								<th scope="col">Surname</th>
								<th scope="col">Age</th>
							</tr>
						</thead>
						<tbody>
							{users &&
								users.map((user, index) => (
									<tr className="table-light" key={index}>
										<th scope="row">{user.firstName}</th>
										<td>{user.surname}</td>
										<td>{user.dateOfBirth}</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Admin;
