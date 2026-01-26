import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { leadAPI } from '../services/api';
import Navbar from './Navbar';
import './LeadList.css';

const LeadList = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            setLoading(true);
            const response = await leadAPI.getAll();
            setLeads(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch leads');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this lead?')) {
            return;
        }

        try {
            await leadAPI.delete(id);
            setLeads(leads.filter((lead) => lead.id !== id));
        } catch (err) {
            alert('Failed to delete lead');
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <Navbar />
                <main>
                    <div className="spinner-wrapper">
                        <div className="spinner"></div>
                        <p>Loading your leads...</p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="app-layout">
            <Navbar />
            <main>
                <div className="list-header">
                    <div>
                        <h1>All Leads</h1>
                        <p>Manage and track your potential clients</p>
                    </div>
                    <button onClick={() => navigate('/leads/new')} className="btn-primary-add">
                        <span className="plus-icon">+</span> New Lead
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-label">Total Leads</span>
                        <span className="stat-value">{leads.length}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Active Leads</span>
                        <span className="stat-value">{leads.filter(l => l.status).length}</span>
                    </div>
                </div>

                <div className="card">
                    {leads.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">📂</div>
                            <h2>No leads found</h2>
                            <p>Get started by capturing your first lead.</p>
                            <button onClick={() => navigate('/leads/new')} className="btn-primary-add">
                                Add First Lead
                            </button>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="leads-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Contact Info</th>
                                        <th>Source</th>
                                        <th>Status</th>
                                        <th>Date Added</th>
                                        <th className="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leads.map((lead) => (
                                        <tr key={lead.id}>
                                            <td className="lead-name-cell">
                                                <strong>{lead.name}</strong>
                                            </td>
                                            <td>
                                                <div className="contact-info">
                                                    <span>{lead.email}</span>
                                                    <small>{lead.phone}</small>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="source-chip">{lead.source}</span>
                                            </td>
                                            <td>
                                                <span className={`status-pill ${lead.status ? 'active' : 'inactive'}`}>
                                                    {lead.status ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td>{new Date(lead.created_at).toLocaleDateString()}</td>
                                            <td className="actions-cell">
                                                <button
                                                    onClick={() => navigate(`/leads/edit/${lead.id}`)}
                                                    className="btn-icon-edit"
                                                    title="Edit Lead"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(lead.id)}
                                                    className="btn-icon-delete"
                                                    title="Delete Lead"
                                                >
                                                    🗑️
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default LeadList;
