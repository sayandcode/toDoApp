export default function template2Node(string){
    const template=document.createElement('template');
    template.innerHTML=string;
    return template.content;
}