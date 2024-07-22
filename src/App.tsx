// App.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@material-ui/core";
import styled from "styled-components";
import { routes } from "./routes";
import { Protected } from "./pages/Auth/Protected";
import { Anonymous } from "./pages/Auth/Anonymous";
import { LoginForm, RegisterForm } from "./pages/Auth";
const AppContainer = styled(Container)`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const App: React.FC = () => {
	return (
		<Router>
			<AppContainer>
				<Routes>
					<Route element={<Protected />}>
						{routes.map((item, index) => (
							<Route
								key={index}
								path={item.link}
								element={<item.component />}
							/>
						))}
					</Route>
					<Route element={<Anonymous />}>
						<Route path='/login' element={<LoginForm />} />
						<Route path='/register' element={<RegisterForm />} />
					</Route>
					<Route path='*' element={<LoginForm />} />
				</Routes>
			</AppContainer>
		</Router>
	);
};

export default App;
