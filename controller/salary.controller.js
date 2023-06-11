import Salary from "../model/salary.model.js";

export const getSalary = async (req, res) => {
  try {
    if (req.admin) {
      const salaries = await Salary.find();
      res.send(salaries);
    } else {
      const salary = await Salary.findOne({ email: req.email });
      if (salary) {
        res.status(201).send(salary);
      } else {
        res.status(401).send("You are not On Pay roll");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const addSalary = async (req, res) => {
  try {
    const { email, salary } = req.body;
    const salData = await Salary.findOne({ email });
    if (salData) {
      res.status(401).send("Already Present");
    }
    const sal = new Salary({ email, salary });
    const result = await sal.save();
    if (result) {
      res.status(200).send("Salary Added");
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateSalary = async (req, res) => {
  try {
    const { email, modification, operation } = req.body;
    const salData = await Salary.findOne({ email });
    let salary = salData.salary;
    let value = Math.abs(salary * (modification / 100));
    if (salData) {
      if (operation == "INC") {
        const result = await Salary.updateOne(
          { email },
          { $set: { salary: salary + value } }
        );
        if (result) {
          res.status(201).send("Increment Done");
        } else {
          res.status(401).send("Problem Occured");
        }
      } else if (operation == "DEC") {
        const result = await Salary.updateOne(
          { email },
          { $set: { salary: salary - value } }
        );
        if (result) {
          res.status(201).send("Decrement Done");
        } else {
          res.status(401).send("Problem Occured");
        }
      } else {
        res.status(401).send("Choose Correct Option");
      }
    } else {
      res.status(401).send("Not in Salary Collection");
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteSalary = async (req, res) => {
  try {
    const email = req.body.email;
    const data = await Salary.findOneAndDelete({ email });
    if (data) {
      res.status(201).send("Deleted Successfuly");
    } else {
      res.status(401).send("Not In Salary Collection");
    }
  } catch (err) {
    console.log(err);
  }
};
