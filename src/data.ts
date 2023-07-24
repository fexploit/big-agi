import * as React from 'react';

export type SystemPurposeId = 'Postify' | 'Plandy' | 'Talkios' | 'Copify';

export const defaultSystemPurposeId: SystemPurposeId = 'Generic';

type SystemPurposeData = {
  title: string;
  description: string | React.JSX.Element;
  systemMessage: string;
  symbol: string;
  examples?: string[];
  highlighted?: boolean;
}

export const SystemPurposes: { [key in SystemPurposeId]: SystemPurposeData } = {
  Postify: {
    title: 'Postify',
    description: 'Sosyal Medya Yönetimini Kolaylaştırır',
    systemMessage: 'Postify, çoklu sosyal medya platformlarında birden fazla hesabı yöneten bireylerin ve işletmelerin tüm sosyal medya hesaplarını merkezi bir noktadan yönetmelerini sağlar. İçerik planlama, zamanlama, paylaşma ve etkileşimlerin ölçümlemesi gibi işlevleriyle, sosyal medya yönetimini daha etkin ve verimli hale getirir.',
    symbol: '👩‍💻',
    examples: ['Postify ile nasıl bir sosyal medya takvimi oluşturabilirim?', 'Birden fazla hesabı aynı anda nasıl yönetebilirim?', 'Ölçümleme raporlarını nasıl oluşturabilirim?'],
  },
  Plandy: {
    title: 'Plandy',
    description: 'Randevu Planlamayı Otomatikleştirir',
    systemMessage: 'Plandy, işletmelerin tüm randevu süreçlerini merkezi bir platformda yönetmelerini sağlar. Müşterilerin uygun zamanlarını görmeleri, randevu oluşturması ve yönetmesi artık çok daha kolay. Hem işletmeler için verimlilik artışı sağlar hem de müşteri memnuniyetini artırır.',
    symbol: '🔬',
    examples: ['Plandy ile nasıl randevu oluşturabilirim?', 'Randevuları yönetmek için hangi özellikleri kullanmalıyım?', 'Müşterilere nasıl randevu bildirimi gönderebilirim?'],
  },
  Talkios: {
    title: 'Talkios',
    description: 'Dil Öğrenmeyi Hızlandıran AI Platformu',
    systemMessage: 'Talkios, kullanıcıların yapay zekayla İngilizce pratik yapabilecekleri bir dil öğrenme mobil platformudur. Günlük yaşam senaryolarıyla, dil öğrenme sürecini hızlandırır ve kullanıcıların özgüvenini artırır. Talkios, her bir kullanıcı için kişiselleştirilmiş bir dil öğrenme deneyimi sunmayı hedefler.',
    symbol: '🚀',
    examples: ['Talkios ile hangi dil öğrenme tekniklerini kullanmalıyım?', 'Yapay zeka ile dil öğrenme sürecim nasıl hızlanır?', 'Özgüvenimi nasıl artırabilirim?'],
  },
  Copify: {
    title: 'Copify',
    description: 'AI Destekli İçerik Oluşturma',
    systemMessage: 'Copify, yapay zeka ile desteklenen hızlı ve etkili içerik üretimi sağlar. İster bir blog yazısı, ister bir makale veya sosyal medya gönderisi olsun, Copify süreçleri hızlandırır ve her seferinde özgün içerikler oluşturmanızı sağlar.',
    symbol: '👔',
    examples: ['Copify ile nasıl özgün içerikler oluşturabilirim?', 'Yapay zekanın içerik oluşturma sürecime ne tür bir katkısı olabilir?', 'Hızlı ve etkili bir blog yazısı nasıl oluşturabilirim?'],
  },
};

