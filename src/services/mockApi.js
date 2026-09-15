// Simulated backend service
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const STORAGE_KEY = 'leadgen_data';

const getInitialData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) return JSON.parse(data);
  
  // Seed with dummy data
  return [
    { id: 1, name: 'Ana Gómez', email: 'ana@empresa.com', type: 'sales', priority: 'low', message: 'Me gustaría información sobre precios', date: new Date(Date.now() - 86400000).toISOString(), status: 'pending' },
    { id: 2, name: 'Luis Martínez', email: 'luis@tecnologia.io', type: 'support', priority: 'high', message: 'El servidor principal está caído', date: new Date(Date.now() - 3600000).toISOString(), status: 'pending' }
  ];
};

export const api = {
  async getLeads() {
    await delay(800); // simulate network
    return getInitialData();
  },
  
  async saveLead(leadData) {
    await delay(1000); // simulate network
    const currentData = getInitialData();
    const newLead = {
      ...leadData,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'pending'
    };
    const updatedData = [newLead, ...currentData];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    return newLead;
  },

  async updateLeadStatus(id, newStatus) {
    await delay(500);
    const currentData = getInitialData();
    const updatedData = currentData.map(lead => 
      lead.id === id ? { ...lead, status: newStatus } : lead
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    return true;
  }
};
