import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react';

const SignupModal = ({ isOpen, onClose, onLogin,  }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [email, setEmail] = useState('');
  const handleSubmit = async (event) => {
      event.preventDefault();
      // Call the login function passed from the parent component
      onLogin(username, password, email);
    };
 
 return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.card}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Signup</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Username" 
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              type="email" 
              placeholder="Email" 
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              placeholder="Password" 
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Confirm Password</FormLabel>
            <Input 
              value={cpassword} 
              onChange={(e) => setCPassword(e.target.value)} 
              type="password" 
              placeholder="Confirm Password" 
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Signup
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SignupModal;