import React, { useState, useEffect } from 'react';
import axios from "axios";
import * as yup from "yup";

// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

// 👇 Here you will create your schema.
const yupValidation = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .min(3, validationErrors.fullNameTooShort)
    .max(20, validationErrors.fullNameTooLong)
    .required(),
  size: yup
    .string()
    .trim()
    .oneOf(["S", "M", "L"], validationErrors.sizeIncorrect)
    .required(),
  toppings: yup
    .array()
    // .optional()
    .ensure()
});

// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [{ topping_id: '1', text: 'Pepperoni' }, { topping_id: '2', text: 'Green Peppers' }, { topping_id: '3', text: 'Pineapple' }, { topping_id: '4', text: 'Mushrooms' }, { topping_id: '5', text: 'Ham' }];

const initialValue = { fullName: "", size: "", toppings: [] };
const initialErrors = { fullName: "", size: "" };
const testData = { fullName: "Alex Handley", size: "M", toppings: ["1", "2", "3", "4", "5"] };

export default function Form() {
  const [ values, setValues ]   = useState(initialValue);
  const [ errors, setErrors ]   = useState(initialErrors);
  const [ enabled, setEnabled ] = useState(false);
  const [ success, setSuccess ] = useState();
  const [ failure, setFailure ] = useState();

  const onChange = function(event) {
    let { id, name, value, type } = event.target;

    // checking the IDs of the checkboxes and pushing them into the values's array
    if (type === "checkbox") {
      let checkboxes = values.toppings;
      if (checkboxes.includes(id)) {
        checkboxes = checkboxes.filter((item) => item !== id);
      } else {
        checkboxes.push(id);
      };
      setValues({ ...values, toppings: checkboxes });
    } else {
      setValues({ ...values, [name]: value });
    };

    // adding functionality to the validation messages
    yup.reach(yupValidation, name).validate(value)
      .then(()      => setErrors({ ...errors, [name]: "" }))
      .catch((err)  => setErrors({ ...errors, [name]: err.errors[0] }));
  };
  const onSubmit = function(event) {
    event.preventDefault();
    axios.post("http://localhost:9009/api/order", values)
    .then((api) => {
      const { data } = api;
      console.log(data.message);
      setSuccess(data.message);
      setFailure();
      setValues(initialValue);
    })
    .catch((error) => {
      console.log("Something went wrong! =>", error);
      setSuccess();
      setFailure(error.response.data.message);
    });
  };
  useEffect(() => {
    console.log(values);
    yupValidation.isValid(values).then(setEnabled);
  }, [values]);

  return (
    <form>
      <h2>Order Your Pizza</h2>
      { success && <div className='success'>{success}</div> }
      { failure && <div className='failure'>{failure}</div> }

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input placeholder="Type full name" id="fullName" name="fullName" type="text" value={values.fullName} onChange={onChange}/>
        </div>
        { errors.fullName && <div className='error'>{errors.fullName}</div> }
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select id="size" name="size" value={values.size} onChange={onChange}>
            <option value="">----Choose Size----</option>
            <option value="L">Large</option>
            <option value="M">Medium</option>
            <option value="S">Small</option>
          </select>
        </div>
        { errors.size && <div className='error'>{errors.size}</div> }
      </div>

      <div className="input-group">
        { toppings.map((items) => (
          <label key={items.topping_id}>
            <input type="checkbox" id={items.topping_id} name="toppings" value={values.toppings} onChange={onChange} />
            {items.text}<br />
          </label>
        )) }
      </div>
      <input type="submit" disabled={!enabled} onClick={onSubmit} />
    </form>
  );
};