import TextEditor from './components/TextEditor'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid'
import Header from './components/Header'
import Footer from './components/Footer'
import AsideToolbar from './components/AsideToolbar'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={`/documents/${uuidV4()}`} />} />
        <Route path="/documents/:id" element={<TextEditor />} />
      </Routes>
      <AsideToolbar />
      <Footer />
    </Router>
  )
}

export default App
