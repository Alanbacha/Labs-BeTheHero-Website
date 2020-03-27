import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";
import logoImg from "../../assets/logo.svg";

export default function Incidents() {
	const history = useHistory();

	const ongID = localStorage.getItem("ongID");
	const ongName = localStorage.getItem("ongName");

	const [incidents, setIncidents] = useState([]);

	useEffect(() => {
		loadIncidents();
	}, [ongID]);

	function loadIncidents() {
		api.get("incident", { headers: { Authorization: ongID } }).then(res => {
			setIncidents(res.data);
		});
	}

	async function handleDeleteIncident(id) {
		try {
			await api.delete(`incident/${id}`, { headers: { Authorization: ongID } });

			setIncidents(incidents.filter(incident => incident.id !== id));
		} catch (err) {
			alert("Erro ao deletar o caso, tente novamente.");
		}
	}

	function handleLogout() {
		localStorage.clear();

		history.push("/");
	}

	return (
		<div className="incidents-container">
			<header>
				<img src={logoImg} alt="Be The Hero" />
				<span>Bem vinda, {ongName}</span>

				<Link className="button" to="/incident/new">
					Cadastrar novo caso
				</Link>

				<button type="button" onClick={handleLogout}>
					<FiPower size={18} color="#E02041" />
				</button>
			</header>

			<h1>Casos cadastrados</h1>

			<ul>
				{incidents.map(incident => (
					<li key={incident.id}>
						<strong>CASO:</strong>
						<p>{incident.title}</p>

						<strong>DESCRIÇÃO:</strong>
						<p>{incident.description}</p>

						<strong>VALOR:</strong>
						<p>{Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(incident.value)}</p>

						<button type="button" onClick={() => handleDeleteIncident(incident.id)}>
							<FiTrash2 size={20} color="#a8a8b3" />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
