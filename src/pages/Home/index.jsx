/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, useEffect } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { Container, Brand, Menu, Search, Content, NewNote } from './styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Link } from 'react-router-dom';


import { Input } from '../../components/Input';
import { Header } from '../../components/Header';
import { Section } from '../../components/Section';
import { ButtonText } from '../../components/ButtonText';
import { Note } from '../../components/Note';
import { api } from '../../../../backend-nodejs-explorer/src/services/api';

export function Home() {
   const [tags, setTags] = useState([]);
   const [tagsSelected, setTagsSelected] = useState([]);
   const [search, setSearch] = useState("");
   const [notes, setNotes] = useState([]);

   function handleTagSelected(tagName) {
      const alreadySelected = tagsSelected.includes(tagName);

      if (alreadySelected) {
         const filteredTags = tagsSelected.filter(tag => tag !== tagName);
         setTagsSelected(filteredTags);

      } else {

         setTagsSelected(prevState => [...prevState, tagName]);
      }
   }



   useEffect(() => {
      async function fetchTags() {
         const response = await api.get("/tags");
         setTags(response.data);

      }

      fetchTags()

   }, []);

   useEffect(() => {
      async function fetchNotes() {
         const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
         setNotes(response.data);

      }

      fetchNotes();
   }, [tagsSelected, search]);

   return (
      <Container>
         <Brand>
            <h1>Rocketnotes</h1>
         </Brand>

         <Header />


         <Menu>

            <li>
               <ButtonText
                  title="Todos"
                  onClick={() => handleTagSelected("all")}
                  $isactive={tagsSelected.length === 0}
               />
            </li>


            {
               tags && tags.map(tag => (

                  <li key={String(tag.id)}>
                     <ButtonText
                        onClick={() => handleTagSelected(tag.name)}
                        $isactive={tagsSelected.includes(tag.name)}

                        title={tag.name}
                     />
                  </li>
               ))}
         </Menu>

         <Search>
            <Input
               placeholder="Pesquisar pelo título"
               icon={FiSearch}
               onChange={() => setSearch(e.target.value)}
            />

         </Search>

         <Content>
            <Section title="Minhas notas">
               {
                  notes.map(note => (

                     <Note
                        key={String(note.id)}
                        data={note}
                     />))
               }

            </Section>

         </Content>

         <NewNote to="/new">
            <FiPlus />
            Criar nota
         </NewNote>
      </Container >
   );
}