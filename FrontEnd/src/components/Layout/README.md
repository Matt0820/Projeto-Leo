# Layout System - Componentes Reutilizáveis

## 📋 Estrutura

O sistema de layout é composto por 3 componentes principais que trabalham juntos:

### 1. **Layout** (`Layout.tsx`)
- Componente wrapper principal
- Combina Header, Sidebar, Content e MusicPlayer
- Aceita `children` para renderizar conteúdo dinâmico

### 2. **Sidebar** (`Sidebar.tsx`)
- Menu de navegação lateral
- Pode ser minimizado/expandido
- Links para Home, Explorar, Player, Favoritos
- Seção de playlists rápidas

### 3. **MusicPlayer** (`MusicPlayer.tsx`)
- Reprodutor fixo no rodapé
- Controles: Play/Pause, Next, Previous
- Barra de progresso e volume
- Exibição de informações da música

## 🚀 Como Usar

### Exemplo de Página com Layout

```tsx
import Layout from "../components/Layout/Layout";

export default function MinhaPage() {
  return (
    <Layout>
      <div className="minha-page">
        <h1>Minha Página</h1>
        {/* Seu conteúdo aqui */}
      </div>
    </Layout>
  );
}
```

### Exemplo: Página de Perfil

```tsx
import Layout from "../components/Layout/Layout";

export default function ProfilePage() {
  return (
    <Layout>
      <div className="profile">
        <div className="profile-header">
          <img src="avatar.jpg" alt="Profile" />
          <h1>Meu Perfil</h1>
        </div>
        <div className="profile-content">
          {/* Conteúdo do perfil */}
        </div>
      </div>
    </Layout>
  );
}
```

## 🎨 Customização

### Modificar Links do Sidebar

Edite `src/components/Sidebar/Sidebar.tsx`:

```tsx
<Link to="/sua-rota" className="nav-item">
  <FaIcon className="icon" />
  {isOpen && <span>Label</span>}
</Link>
```

### Customizar Cores

Edite os arquivos `.css`:
- `layout.css` - Estilos do layout
- `sidebar.css` - Estilos da sidebar
- `musicPlayer.css` - Estilos do player

### Integrar com API Real

No `MusicPlayer.tsx`, substitua o estado mockado:

```tsx
// De:
const [currentTrack] = useState<Track>({...});

// Para:
const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

useEffect(() => {
  // Buscar música atual do backend
  fetchCurrentTrack();
}, []);
```

## 📱 Responsividade

- **Desktop**: Sidebar completa (250px) + conteúdo completo
- **Tablet (≤1024px)**: Player em 2 colunas, volume oculto
- **Mobile (≤768px)**: Sidebar horizontal no topo, player em 1 coluna

## 🔄 Fluxo de Navegação

```
Home (Landing) (/)/
    ↓
Login ou Register
    ↓
Home ou Player (com Layout)
```

## 📁 Arquivos Criados

```
src/
├── components/
│   ├── Layout/
│   │   ├── Layout.tsx
│   │   └── layout.css
│   ├── Sidebar/
│   │   ├── Sidebar.tsx
│   │   └── sidebar.css
│   └── MusicPlayer/
│       ├── MusicPlayer.tsx
│       └── musicPlayer.css
└── pages/
    ├── Player.tsx (atualizado)
    └── Home.tsx
```

## ✅ Checklist de Uso

- [ ] Importar `Layout` na página
- [ ] Envolver conteúdo com `<Layout></Layout>`
- [ ] Adicionar rota no `App.tsx` se necessário
- [ ] Customizar estilos conforme necessário
- [ ] Integrar com dados reais (música, usuário, etc)

## 🐛 Troubleshooting

**Sidebar não aparece:**
- Verifique se `react-icons` está instalado
- Confirme importações no Sidebar.tsx

**Player muito grande:**
- Ajuste padding/gap em `musicPlayer.css`
- Reduza tamanho dos botões em mobile

**Scrollbar visível:**
- CSS já inclui customização de scrollbar
- Se não funcionar, use biblioteca externa

---

Componentes prontos para usar! 🎉
