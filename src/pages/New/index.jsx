import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Section } from '../../components/Section';
import { Textarea } from '../../components/Textarea';
import { NoteItem } from '../../components/NoteItem';

import { Container, Form } from './styles';

export function New() {
   const [links, setLinks] = useState([]);
   const [newLink, setNewLink] = useState("");

   const [tags, setTags] = useState([]);
   const [newTag, setNewTag] = useState("");


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

   return (
      <Container>
         <Header />

         <main>
            <Form>
               <header>
                  <h1>Criar nota</h1>
                  <Link to="/">voltar</Link>
               </header>

               <Input placeholder="Título" />
               <Textarea placeholder="Observações" />

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
                        tags.map((tag, index) => (
                           <NoteItem
                              key={String(index)}
                              value={tag}
                              onclick={() => { }}
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
               <Button title="Salvar" />
            </Form>
         </main>
      </Container>
   )
}