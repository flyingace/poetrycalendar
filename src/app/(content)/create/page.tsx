'use client';

import { useState, useEffect } from 'react';
import { createListing } from '@/apis/listings';
import { getAllVenues } from '@/apis/venues';
import styles from './create.module.scss';

interface ListingFormData {
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  venue: string;
  cost: string;
  description: string;
  created_by: string;
  type: string;
}

interface Venue {
  id: number;
  name: string;
}

export default function CreatePage() {
  const [formData, setFormData] = useState<ListingFormData>({
    title: '',
    date: '',
    start_time: '',
    end_time: '',
    venue: '',
    cost: '',
    description: '',
    created_by: '1',
    type: 'Reading',
  });
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const venuesData = await getAllVenues();
        setVenues(venuesData);
      } catch (error) {
        console.error('Error fetching venues:', error);
        setMessage({
          type: 'error',
          text: 'Failed to load venues. Please refresh the page.',
        });
      }
    };

    fetchVenues();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    // Basic validation
    if (
      !formData.title.trim() ||
      !formData.date.trim() ||
      !formData.start_time.trim() ||
      !formData.venue.trim() ||
      !formData.cost.trim() ||
      !formData.description.trim()
    ) {
      setMessage({
        type: 'error',
        text: 'Please fill in all required fields.',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Combine date and time for start_time
      const startDateTime = new Date(`${formData.date}T${formData.start_time}`);
      let endDateTime;

      if (formData.end_time.trim()) {
        endDateTime = new Date(`${formData.date}T${formData.end_time}`);
      }

      const listingData = {
        title: formData.title.trim(),
        start_time: startDateTime,
        end_time: endDateTime,
        venue: parseInt(formData.venue),
        cost: parseFloat(formData.cost),
        description: formData.description.trim(),
        created_by: parseInt(formData.created_by),
        type: formData.type,
      };

      await createListing(listingData);
      setMessage({ type: 'success', text: 'Listing created successfully!' });

      // Reset form
      setFormData({
        title: '',
        date: '',
        start_time: '',
        end_time: '',
        venue: '',
        cost: '',
        description: '',
        created_by: '1',
        type: 'Reading',
      });
    } catch (error) {
      console.error('Error creating listing:', error);
      setMessage({
        type: 'error',
        text: 'Failed to create listing. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.createPage}>
      <h1>Create Listing</h1>

      <div className={styles.formContainer}>
        <h2>Add New Listing</h2>

        {message && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.listingForm}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Title <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="date" className={styles.label}>
                Date <span className={styles.required}>*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="start_time" className={styles.label}>
                Start Time <span className={styles.required}>*</span>
              </label>
              <input
                type="time"
                id="start_time"
                name="start_time"
                value={formData.start_time}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="end_time" className={styles.label}>
                End Time
              </label>
              <input
                type="time"
                id="end_time"
                name="end_time"
                value={formData.end_time}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="venue" className={styles.label}>
                Venue <span className={styles.required}>*</span>
              </label>
              <select
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                className={styles.input}
                required
              >
                <option value="">Select a venue</option>
                {venues.map((venue) => (
                  <option key={venue.id} value={venue.id}>
                    {venue.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="cost" className={styles.label}>
                Cost <span className={styles.required}>*</span>
              </label>
              <input
                type="number"
                id="cost"
                name="cost"
                value={formData.cost}
                onChange={handleInputChange}
                className={styles.input}
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="type" className={styles.label}>
                Type
              </label>
              <input
                type="text"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Description <span className={styles.required}>*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`${styles.input} ${styles.textarea}`}
              rows={4}
              required
            />
          </div>

          <input type="hidden" name="created_by" value={formData.created_by} />

          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? 'Creating...' : 'Create Listing'}
          </button>
        </form>
      </div>
    </div>
  );
}
