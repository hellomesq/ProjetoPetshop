import servicesData from '../services.json'; 

export default function handler(req, res) {
    res.status(200).json(servicesData);
}




