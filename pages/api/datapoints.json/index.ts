export default function handler(req, res) {
  const data = req.body.data;

  res.status(200).json(data);
}
