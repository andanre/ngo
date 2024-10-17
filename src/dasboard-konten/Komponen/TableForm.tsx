import React, { useState } from 'react';

interface Item {
  id?: number; // Perubahan untuk mendukung id yang undefined saat menambahkan item baru
  title: string;
  content?: string;
  url?: string;
  type?: string;
}

interface TableFormProps {
  item: Item;
  onSave: (item: Item) => Promise<void>; // Karena onSave adalah async function
  onCancel: () => void;
}

export const TableForm: React.FC<TableFormProps> = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Item>(item);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData); // onSave dipanggil dengan formData
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-control" />
      </div>
      {item.content !== undefined || item.url !== undefined ? (
        <>
          {item.content !== undefined && (
            <div className="mb-3">
              <label className="form-label">Content</label>
              <textarea name="content" value={formData.content} onChange={handleChange} className="form-control" />
            </div>
          )}
          {item.url !== undefined && (
            <div className="mb-3">
              <label className="form-label">URL</label>
              <input type="text" name="url" value={formData.url} onChange={handleChange} className="form-control" />
            </div>
          )}
          {item.type !== undefined && (
            <div className="mb-3">
              <label className="form-label">Type</label>
              <input type="text" name="type" value={formData.type} onChange={handleChange} className="form-control" />
            </div>
          )}
        </>
      ) : null}
      <button type="submit" className="btn btn-primary me-2">Save</button>
      <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
    </form>
  );
};
