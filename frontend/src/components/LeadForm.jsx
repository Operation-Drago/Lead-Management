import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { leadAPI } from '../services/api';
import Navbar from './Navbar';
import './LeadForm.css';

const LeadForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        source: '',
        status: true,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEdit) {
            fetchLead();
        }
    }, [id]);

    const fetchLead = async () => {
        try {
            const response = await leadAPI.getById(id);
            setFormData(response.data);
        } catch (err) {
            setError('Failed to fetch lead details');
            console.error(err);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isEdit) {
                await leadAPI.update(id, formData);
            } else {
                await leadAPI.create(formData);
            }
            navigate('/leads');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save lead');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-layout">
            <Navbar />
            <main>
                <div className="form-container-full">
                    <div className="form-header-row">
                        <button onClick={() => navigate('/leads')} className="btn-text-back">
                            ← Back to Leads
                        </button>
                        <h1>{isEdit ? 'Edit Lead' : 'Create New Lead'}</h1>
                    </div>

                    <div className="form-card-main">
                        <form onSubmit={handleSubmit}>
                            {error && <div className="error-message">{error}</div>}

                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g. John Doe"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g. john@example.com"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g. +1 234 567 890"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="source">Lead Source</label>
                                    <select
                                        id="source"
                                        name="source"
                                        value={formData.source}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select a source</option>
                                        <option value="Website">Website</option>
                                        <option value="Referral">Referral</option>
                                        <option value="Social Media">Social Media</option>
                                        <option value="Advertisement">Advertisement</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group-checkbox">
                                <label className="custom-checkbox">
                                    <input
                                        type="checkbox"
                                        name="status"
                                        checked={formData.status}
                                        onChange={handleChange}
                                    />
                                    <span className="checkmark"></span>
                                    <span className="label-text">Set as Active Lead</span>
                                </label>
                            </div>

                            <div className="form-footer">
                                <button
                                    type="button"
                                    onClick={() => navigate('/leads')}
                                    className="btn-secondary-cancel"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary-submit" disabled={loading}>
                                    {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Lead'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LeadForm;
