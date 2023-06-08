import Salary from "../model/salary.model.js";

export const getSalary = async (req, res) => {
  try {
    if (req.admin) {
      const salaries = await Salary.find();
      res.send(salaries);
    } else {
      const salary = await Salary.findOne({ email: req.email });
      res.send(salary);
    }
  } catch (err) {
    console.log(err);
  }
};

export const addSalary = async (req, res) => {
  try {
    const { email, salary } = req.body;
    const sal = new Salary({ email, salary });
    const result = await sal.save();
    if (result) {
      res.send("Salary Added");
    }
  } catch (err) {
    console.log(err);
  }
};
