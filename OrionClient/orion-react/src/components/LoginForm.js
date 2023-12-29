import React, { Component } from 'react';
import './LoginForm.css';
import loginApiService from '../services/loginApiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toastrService from '../services/toastrService';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      rememberMe: false,
    };
  }

  componentDidMount() {
    window.addEventListener('keypress', this.handleGlobalKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleGlobalKeyPress);
  }

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === 'checkbox') {
      this.setState({ [name]: checked });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password, rememberMe } = this.state;

    if (!username || !password) {
toastrService.errorNotification("Kullanıcı adı ve şifre zorunlu!")
      return;
    }

    const requestData = {
      userName: username,
      password: password,
    };

    try {
      const data = await loginApiService.fetchData(requestData, '/User', 'Post');

      if (data) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('token', data.token.accessToken);
        toastrService.succesNotification("Giriş işlemi başarılı!");
          const redirectTimeout = setTimeout(() => {
            window.location.href = 'PhoneDirectory';
          }, 2000);
      }
    } catch (error) {
     toastrService.errorNotification("Kullanıcı adı veya şifresi yanlış!");
    }
  };

  handleGlobalKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  };

  render() {
    return (
      <div className="Form">
        <form onSubmit={this.handleSubmit}>
          <label>
            <span className="LoginSpan">Kullanıcı Adı: </span>
            <input type="text" name="username" onChange={this.handleChange} />
          </label>
          <br />
          <label>
            <span className="LoginSpan Password"> Şifre: </span>
            <input type="password" name="password" onChange={this.handleChange} />
          </label>
          <br />
          <label>
            <span className="LoginSpan RememberMe"> Beni Hatırla: </span>
            <input type="checkbox" name="rememberMe" onChange={this.handleChange} />
          </label>         
        </form>   
        <ToastContainer/>
      </div>
    );
  }
}

export default LoginForm;
