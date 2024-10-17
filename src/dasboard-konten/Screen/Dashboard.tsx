import React, { useState, useEffect } from 'react';
import { TableForm } from '../Komponen/TableForm';
import { fetchData, addData, updateData, deleteData } from '../../api/service';
import { useNavigate } from 'react-router-dom';

interface Item {
  id?: number;
  title: string;
  content?: string;
  url?: string;
  type?: string;
}

export const Dashboard: React.FC = () => {
  const [dataType, setDataType] = useState<'announcements' | 'post' | 'media' | 'documents'>('announcements');
  const [data, setData] = useState<Item[]>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const fetchedData = await fetchData(`/${dataType}`);
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataFromApi();
  }, [dataType]);

  const handleEdit = (item: Item) => {
    setEditingItem(item);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteData(`/${dataType}/${id}`);
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleSave = async (item: Item) => {
    try {
      if (item.id) {
        await updateData(`/${dataType}/${item.id}`, item);
        setData(data.map(i => (i.id === item.id ? item : i)));
      } else {
        const newItem = await addData(`/${dataType}`, item);
        setData([...data, newItem]);
      }
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  const handleCreate = () => {
    setEditingItem({ title: '', content: '', url: '', type: '' });
  };

  const renderTableHeaders = () => {
    switch (dataType) {
      case 'announcements':
        return (
          <>
            <th>Title</th>
            <th>Content</th>
          </>
        );
      case 'post':
        return (
          <>
            <th>Title</th>
            <th>URL</th>
            <th>Content</th>
            <th>Type</th>
          </>
        );
      case 'media':
        return (
          <>
            <th>Title</th>
            <th>URL</th>
            <th>Type</th>
          </>
        );
      case 'documents':
        return (
          <>
            <th>Title</th>
            <th>URL</th>
            <th>Content</th>
            <th>Type</th>
          </>
        );
      default:
        return null;
    }
  };

  const renderTableRows = () => {
    return data.map(item => (
      <tr key={item.id}>
        <td>{item.title}</td>
        {dataType === 'post' || dataType === 'media' || dataType === 'documents' ? <td>{item.url}</td> : null}
        {dataType === 'announcements' || dataType === 'post' || dataType === 'documents' ? <td>{item.content}</td> : null}
        {dataType === 'post' || dataType === 'media' || dataType === 'documents' ? <td>{item.type}</td> : null}
        <td>
          <button onClick={() => handleEdit(item)} className="btn btn-primary btn-sm me-2">Edit</button>
          <button onClick={() => handleDelete(item.id!)} className="btn btn-danger btn-sm">Delete</button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Dashboard</h1>

      <button onClick={handleLogout} className="btn btn-danger mb-4">Logout</button>

      <select className="form-select mb-4" value={dataType} onChange={(e) => setDataType(e.target.value as any)}>
        <option value="announcements">Announcements</option>
        <option value="post">Post</option>
        <option value="media">Media</option>
        <option value="documents">Documents</option>
      </select>

      <button onClick={handleCreate} className="btn btn-success mb-4">Create New</button>

      <table className="table table-bordered">
        <thead>
          <tr>{renderTableHeaders()}</tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>

      {editingItem && (
        <TableForm item={editingItem} onSave={handleSave} onCancel={handleCancel} />
      )}
    </div>
  );
};
