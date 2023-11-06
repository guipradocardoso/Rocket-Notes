import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Section } from '../../components/Section';
import { Textarea } from '../../components/Textarea';
import { NoteItem } from '../../components/NoteItem';

import { api } from '../../../../backend-nodejs-explorer/src/services/api';

import { Container, Form } from './styles';

export function New() {

   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");

   const [links, setLinks] = useState([]);
   const [newLink, setNewLink] = useState("");

   const [tags, setTags] = useState([]);
   const [newTag, setNewTag] = useState("");

   const navigate = useNavigate();


   function handleAddLink() {
      setLinks(prevState => [...prevState, newLink])
      setNewLink("");
   }

   function handleRemoveLink(deleted) {
      setLinks(prevState => prevState.filter(link => link !== deleted));

   }

   function handleAddTag() {
      setTags(prevstate => [...prevstate, newTag]);
      setNewTag("");
   }

   function handleRemoveTag(deleted) {
      setTags(prevState => prevState.filter(tag => tag !== deleted));
   }

   async function handleNewNote() {
      if (!title) {
         return alert("Digite o título da nota");
      }
      if (newLink) {
         return alert("Voçê deixou um link no campo para adicionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vázio");

      }
      if (newTag) {
         return alert("Voçê deixou uma tag no campo para adicionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vázio");
      }

      await api.post("/notes", {
         title,
         description,
         tags,
         links
      });

      alert("Nota criada com sucesso!");

      navigate("/");

   }

   return (
      <Container>
         <Header />

         <main>
            <Form>
               <header>
                  <h1>Criar nota</h1>
                  <Link to="/">voltar</Link>
               </header>

               <Input
                  placeholder="Título"
                  onChange={e => setTitle(e.target.value)}
               />
               <Textarea
                  placeholder="Observações"
                  onChange={e => setDescription(e.target.value)}
               />

               <Section title="Links úteis">
                  {
                     links.map((link, index) => (
                        <NoteItem
                           key={String(index)}
                           value={link}
                           // eslint-disable-next-line @typescript-eslint/no-empty-function
                           onClick={() => { handleRemoveLink(link) }} />
                     ))

                  }
                  <NoteItem
                     isNew
                     placeholder="Novo link"
                     value={newLink}
                     onChange={e => setNewLink(e.target.value)}
                     onClick={handleAddLink} />
               </Section>

               <Section title="Marcadores">
                  <div className="tags">
                     {
                        tags.map((tag, index,) => (
                           <NoteItem
                              key={String(index)}
                              value={tag}
                              // eslint-disable-next-line @typescript-eslint/no-empty-function
                              onClick={() => { handleRemoveTag(tag) }}
                           />

                        ))
                     }

                     <NoteItem
                        isNew
                        placeholder="Nova tag"
                        onChange={e => setNewTag(e.target.value)}
                        value={newTag}
                        onClick={handleAddTag}
                     />
                  </div>
               </Section>
               <Button
                  title="Salvar"
                  onClick={handleNewNote}
               />
            </Form>
         </main>
      </Container>
   )
}