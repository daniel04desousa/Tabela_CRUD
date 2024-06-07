/**
 * Nome do arquivo: CRUD.js
 * Data de criação: 04/06/2024
 * Autor: Daniel Andrade
 * Matrícula: 01612047
 *
 * Descrição:
 * Este arquivo JavaScript é responsável por mostrar a tabela
 * CRUD em HTML com todas as suas funcionalidades.
 *
 * Este script é parte o curso de ADS.
 */

// pages/CRUD.js

import { useEffect, useState } from 'react';

export default function CRUD() {
    const [items, setItems] = useState([]);
    const [id, setId] = useState(null); // Inicializa o ID como null
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Não altera initTable
    }, []);

    const generateRandomId = () => {
        // Gera um ID aleatório de 3 dígitos
        return Math.floor(Math.random() * 900) + 100;
    };

    const addRow = () => {
        const newItem = { id: generateRandomId(), nome, descricao, preco };
        setItems([...items, newItem]);
    };

    const editRow = (id, nome, descricao, preco) => {
        setId(id);
        setNome(nome);
        setDescricao(descricao);
        setPreco(preco);
        setIsUpdating(true);
    };

    const deleteRow = (id) => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nome || !descricao || !preco) {
            setError('Todos os campos devem ser preenchidos.');
            return;
        }
        setError('');
        if (isUpdating) {
            // Se estiver atualizando, encontra o item pelo ID e atualiza os campos
            const updatedItems = items.map(item => {
                if (item.id === id) {
                    return { ...item, nome, descricao, preco };
                }
                return item;
            });
            setItems(updatedItems);
            setIsUpdating(false);
        } else {
            // Se não estiver atualizando, adiciona um novo item
            addRow();
        }
        setId(null); // Reseta o ID após a submissão
        setNome('');
        setDescricao('');
        setPreco('');
    };

    const handleClear = () => {
        setId(null); // Reseta o ID ao limpar o formulário
        setNome('');
        setDescricao('');
        setPreco('');
        setIsUpdating(false);
        setError('');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ border: '1px solid black', padding: '20px', marginBottom: '20px', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '20px' }}>Produtos</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ marginRight: '10px' }}>Nome:</label>
                            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ marginRight: '10px' }}>Descrição:</label>
                            <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ marginRight: '10px' }}>Preço:</label>
                            <input type="text" value={preco} onChange={(e) => setPreco(e.target.value)} />
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            {isUpdating ? (
                                <button type="submit" style={{ marginRight: '5px' }}>Atualizar</button>
                            ) : (
                                <button type="button" onClick={handleSubmit} style={{ marginRight: '5px' }}>Adicionar</button>
                            )}
                            <button type="button" onClick={handleClear} style={{ marginLeft: '5px' }}>Limpar</button>
                        </div>
                    </form>
                </div>
                <div style={{ border: '1px solid black', padding: '20px', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '20px' }}>Produtos Registrados</h2>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Nome</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Descrição</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Preço</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.id}>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{item.id}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{item.nome}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{item.descricao}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{item.preco}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>
                                        <button onClick={() => editRow(item.id, item.nome, item.descricao, item.preco)}>Editar</button>
                                        {" / "}
                                        <button onClick={() => deleteRow(item.id)}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}