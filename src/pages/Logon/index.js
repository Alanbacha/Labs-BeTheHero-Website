import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";

export default function Logon() {
	const history = useHistory();

	const [id, setID] = useState(localStorage.getItem("ongID") || "");

	async function handleLogon(e) {
		e.preventDefault();

		if (id !== "") {
			try {
				const data = { id };

				const response = await api.post("session", data);

				localStorage.setItem("ongID", id);
				localStorage.setItem("ongName", response.data.name);

				history.push("/incidents");
			} catch (err) {
				alert("Erro no logon, tente novamente");
			}
		}
	}

	return (
		<div className="logon-container">
			<div className="content">
				<section>
					<img src={logoImg} alt="Be The Hero" />

					<form onSubmit={handleLogon}>
						<h1>Faça seu logon</h1>
						<input placeholder="Sua ID" value={id} onChange={e => setID(e.target.value)} />
						<button className="button" type="submit">
							Entrar
						</button>

						<Link to="/register" className="back-link">
							<FiLogIn size={16} color="#E02041" />
							Não tenho cadastro
						</Link>
					</form>
				</section>

				<img src={heroesImg} alt="Heroes" />
			</div>
		</div>
	);
}
