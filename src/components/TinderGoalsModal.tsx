import CloseIcon from '@mui/icons-material/Close';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import React, { useEffect, useMemo, useState } from 'react';
import useGoalsStore from '../hooks/useGoalsStore';

interface TinderGoalsModalProps {
  open: boolean;
  onClose: () => void;
}

const SWIPE_LIMIT = 120;

const TinderGoalsModal: React.FC<TinderGoalsModalProps> = ({ open, onClose }) => {
  const { goals, addPositive, addNegative } = useGoalsStore();

  const [currentIndex, setCurrentIndex] = useState(0);

  // Sempre que abrir o modal ou as metas mudarem, resetar o índice
  useEffect(() => {
    if (open) {
      setCurrentIndex(0);
    }
  }, [open, goals]);

  // Meta atual
  const currentGoal = goals[currentIndex];

  // Estados de animação do CARD
  // Este 'x' e 'rotate' controlam a posição e a rotação de TODO o card.
  const [{ x, rotate }, api] = useSpring(() => ({
    x: 0,
    rotate: 0,
  }));

  // Função para finalizar swipe (esquerda ou direita).
  const handleSwipeEnd = (direction: 'right' | 'left') => {
    if (!currentGoal) return;

    if (direction === 'right') {
      addPositive();
    } else {
      addNegative();
    }

    // Avança para a próxima meta
    setCurrentIndex((idx) => idx + 1);

    // Reset da animação para o próximo card
    api.start({ x: 0, rotate: 0 });
  };

  // =========================================
  // GESTOS: Botão da ESQUERDA (ThumbDown)
  // =========================================
  // Quando o usuário arrasta esse botão, move o CARD para a esquerda.
  const bindLeft = useGesture({
    onDrag: ({ offset: [mx], down }) => {
      if (!down) {
        // Soltou o mouse/touch => decidir se passou do limite
        if (mx < -SWIPE_LIMIT) {
          handleSwipeEnd('left');
        } else {
          // volta pro meio
          api.start({ x: 0, rotate: 0 });
        }
      } else {
        // Enquanto arrasta, move de acordo com mx
        // (mx é negativo se arrasta para a esquerda)
        api.start({
          x: mx,
          rotate: mx / 20,
          immediate: true,
        });
      }
    },
  });

  // =========================================
  // GESTOS: Botão da DIREITA (ThumbUp)
  // =========================================
  // Quando arrasta esse botão, move o CARD para a direita.
  const bindRight = useGesture({
    onDrag: ({ offset: [mx], down }) => {
      if (!down) {
        // Soltou?
        if (mx > SWIPE_LIMIT) {
          handleSwipeEnd('right');
        } else {
          api.start({ x: 0, rotate: 0 });
        }
      } else {
        // Enquanto arrasta: x positivo
        api.start({
          x: mx,
          rotate: mx / 20,
          immediate: true,
        });
      }
    },
  });

  // Card principal ou mensagem de "acabou"
  const content = useMemo(() => {
    if (!currentGoal) {
      return (
        <Box
          sx={{
            width: 300,
            height: 200,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          <Typography>Não há mais metas para avaliar.</Typography>
        </Box>
      );
    }

    return (
      <animated.div
        style={{
          width: 300,
          height: 200,
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          touchAction: 'none', // evita scroll no mobile
          transform: x.to((val) => `translateX(${val}px)`),
          rotate,
        }}
      >
        {/* Texto da meta no centro */}
        <Typography variant="h6" textAlign="center" sx={{ px: 2 }}>
          {currentGoal.text}
        </Typography>

        {/* Botão ESQUERDA - ThumbDown */}
        <animated.div
          {...bindLeft()} // Liga as gestos somente nesse botão
          style={{
            position: 'absolute',
            top: 'calc(50% - 30px)',
            left: '20px',
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: '#fdd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'grab',
          }}
        >
          <ThumbDownIcon sx={{ color: 'red' }} />
        </animated.div>

        {/* Botão DIREITA - ThumbUp */}
        <animated.div
          {...bindRight()}
          style={{
            position: 'absolute',
            top: 'calc(50% - 30px)',
            right: '20px',
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: '#dfd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'grab',
          }}
        >
          <ThumbUpIcon sx={{ color: 'green' }} />
        </animated.div>
      </animated.div>
    );
  }, [currentGoal, x, rotate, bindLeft, bindRight]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          outline: 'none',
        }}
      >
        {/* Botão de fechar no topo */}
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: '-40px', right: '-10px' }}
        >
          <CloseIcon />
        </IconButton>

        {content}
      </Box>
    </Modal>
  );
};

export default TinderGoalsModal;
