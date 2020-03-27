import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";
import logoImg from "../../assets/logo.svg";

export default function Register() {
	const history = useHistory();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [whatsapp, setWhatsApp] = useState("");
	const [city, setCity] = useState("");
	const [uf, setUF] = useState("");

	async function handleRegister(e) {
		e.preventDefault();

		try {
			const data = { name, email, whatsapp, city, uf };

			const response = await api.post("ong", data);

			localStorage.setItem("ongID", response.data.id);
			history.push("/");
		} catch (err) {
			alert("Erro no cadastro, tente novamente.");
		}
	}

	return (
		<div className="register-container">
			<div className="content">
				<section>
					<img src={logoImg} alt="Be The Hero" />

					<h1>Cadastro</h1>
					<p>Faça seu cadastro, entre na plataforma e ajud pessoas a encontrarem os casos da sua ONG.</p>

					<Link to="/" className="back-link">
						<FiArrowLeft size={16} color="#E02041" />
						Já tenho cadastro
					</Link>
				</section>

				<form onSubmit={handleRegister}>
					<input value={name} onChange={e => setName(e.target.value)} placeholder="Nome da ONG" />
					<input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" type="Email" />
					<input value={whatsapp} onChange={e => setWhatsApp(e.target.value)} placeholder="WhatsApp" />

					<div className="input-group">
						<input value={city} onChange={e => setCity(e.target.value)} placeholder="Cidade" />
						<input value={uf} onChange={e => setUF(e.target.value)} placeholder="UF" style={{ width: 80 }} />
					</div>

					<button className="button" type="submit">
						Cadastrar
					</button>
				</form>
			</div>
		</div>
	);
}
